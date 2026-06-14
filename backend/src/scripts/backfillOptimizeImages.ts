import "dotenv/config"; // must run before supabaseStorage reads process.env

import path from "path";
import { sequelize } from "../config/db.postgres";
import { UserPhoto, HoroscopeDetails } from "../models/sequelize";
import {
  downloadFromStorage,
  uploadObjectToStorage,
  deleteFromStorage,
  getStoragePathFromUrl,
} from "../config/supabaseStorage";
import { optimizeImage } from "../utils/imageOptimizer";

/**
 * Backfill script: re-compresses images already in Supabase Storage to WebP and
 * rewrites the DB url columns to point at the new objects.
 *
 *   DRY RUN (default): npx ts-node src/scripts/backfillOptimizeImages.ts
 *   APPLY:             npx ts-node src/scripts/backfillOptimizeImages.ts --apply
 *   Limit rows:        ... --limit=50
 *
 * Dry run only downloads + measures; it never uploads, deletes, or writes to the
 * DB. Idempotent: rows already stored as .webp are skipped, so it's safe to
 * re-run after an interrupted apply.
 */

interface Target {
  label: string; // human-readable id for logs
  url: string;
  save: (newUrl: string) => Promise<void>;
}

const APPLY = process.argv.includes("--apply");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

function fmtKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/** Builds a fresh .webp object path in the same folder as the original. */
function webpPathFor(oldUrl: string): string | null {
  const oldPath = getStoragePathFromUrl(oldUrl);
  if (!oldPath) return null;
  const dir = path.posix.dirname(oldPath);
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${dir}/${uniqueSuffix}.webp`;
}

/** True if the url points into our bucket and isn't already a webp/pdf. */
function isOptimizable(url: string | null): url is string {
  if (!url) return false;
  const objectPath = getStoragePathFromUrl(url);
  if (!objectPath) return false; // legacy/external url — leave alone
  const ext = path.extname(objectPath).toLowerCase();
  return ext !== ".webp" && ext !== ".pdf";
}

async function collectTargets(): Promise<Target[]> {
  const targets: Target[] = [];

  const photos = await UserPhoto.findAll();
  for (const photo of photos) {
    if (!isOptimizable(photo.url)) continue;
    targets.push({
      label: `UserPhoto#${photo.id}`,
      url: photo.url,
      save: async (newUrl) => {
        photo.url = newUrl;
        await photo.save();
      },
    });
  }

  const horoscopes = await HoroscopeDetails.findAll();
  for (const h of horoscopes) {
    if (!isOptimizable(h.horoscopeImageUrl)) continue;
    targets.push({
      label: `HoroscopeDetails#${h.id}`,
      url: h.horoscopeImageUrl as string,
      save: async (newUrl) => {
        h.horoscopeImageUrl = newUrl;
        await h.save();
      },
    });
  }

  return targets;
}

async function run(): Promise<void> {
  await sequelize.authenticate();

  const all = await collectTargets();
  const targets = all.slice(0, LIMIT);
  console.log(
    `Mode: ${APPLY ? "APPLY" : "DRY RUN"} | candidates: ${all.length}` +
      (Number.isFinite(LIMIT) ? ` | processing: ${targets.length}` : ""),
  );

  let originalTotal = 0;
  let optimizedTotal = 0;
  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const target of targets) {
    try {
      const buffer = await downloadFromStorage(target.url);
      if (!buffer) {
        console.warn(`  SKIP ${target.label}: could not download`);
        skipped++;
        continue;
      }

      let optimized;
      try {
        optimized = await optimizeImage(buffer);
      } catch (err) {
        console.warn(
          `  SKIP ${target.label}: not a decodable image (${(err as Error).message})`,
        );
        skipped++;
        continue;
      }

      // Only rewrite if we actually saved bytes; otherwise leave the original.
      if (optimized.buffer.length >= buffer.length) {
        console.log(
          `  KEEP ${target.label}: ${fmtKB(buffer.length)} -> ${fmtKB(optimized.buffer.length)} (no gain)`,
        );
        skipped++;
        continue;
      }

      originalTotal += buffer.length;
      optimizedTotal += optimized.buffer.length;
      const pct = (100 * (1 - optimized.buffer.length / buffer.length)).toFixed(0);

      if (!APPLY) {
        console.log(
          `  WOULD ${target.label}: ${fmtKB(buffer.length)} -> ${fmtKB(optimized.buffer.length)} (-${pct}%)`,
        );
        processed++;
        continue;
      }

      const newPath = webpPathFor(target.url);
      if (!newPath) {
        console.warn(`  SKIP ${target.label}: could not derive new path`);
        skipped++;
        continue;
      }

      const newUrl = await uploadObjectToStorage(
        optimized.buffer,
        newPath,
        optimized.contentType,
      );
      const oldUrl = target.url;
      await target.save(newUrl); // commit DB first, so we never orphan a live row
      await deleteFromStorage(oldUrl); // best-effort; never throws
      console.log(
        `  DONE ${target.label}: ${fmtKB(buffer.length)} -> ${fmtKB(optimized.buffer.length)} (-${pct}%)`,
      );
      processed++;
    } catch (err) {
      console.error(`  FAIL ${target.label}: ${(err as Error).message}`);
      failed++;
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Processed: ${processed} | Skipped: ${skipped} | Failed: ${failed}`);
  if (originalTotal > 0) {
    const pct = (100 * (1 - optimizedTotal / originalTotal)).toFixed(1);
    console.log(
      `Bytes: ${fmtKB(originalTotal)} -> ${fmtKB(optimizedTotal)} (-${pct}%)` +
        (APPLY ? "" : " [dry run — nothing written]"),
    );
  }
  if (!APPLY && processed > 0) {
    console.log("Re-run with --apply to perform the migration.");
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Backfill failed:", err);
    process.exit(1);
  });
