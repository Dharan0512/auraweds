import { createClient, SupabaseClient } from "@supabase/supabase-js";
import path from "path";
import logger from "../utils/logger";

/**
 * Supabase Storage configuration. Uploads happen server-side using the
 * service-role key so they bypass Row Level Security. Nothing touches the
 * local filesystem, so this works on read-only serverless platforms (Vercel).
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "uploads";

const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

if (!isSupabaseConfigured) {
  logger.warn(
    "Supabase Storage is not configured. Image uploads will fail until " +
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
  );
}

let supabase: SupabaseClient | null = null;

const getSupabaseClient = (): SupabaseClient => {
  if (!supabase && isSupabaseConfigured) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return supabase as SupabaseClient;
};

/**
 * Uploads an in-memory file buffer (from multer memoryStorage) to Supabase
 * Storage and returns the object's public URL. The target bucket must be
 * public for getPublicUrl() to resolve.
 *
 * If Supabase is not configured (local development), returns a mock URL.
 */
export async function uploadBufferToStorage(
  buffer: Buffer,
  options: { folder: string; originalName: string; contentType: string },
): Promise<string> {
  const ext = path.extname(options.originalName).toLowerCase();
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const objectPath = `${options.folder}/${uniqueSuffix}${ext}`;

  if (!isSupabaseConfigured) {
    logger.debug(`[LOCAL] Mock upload: ${objectPath}`);
    return `http://localhost:5000/uploads/${objectPath}`;
  }

  const client = getSupabaseClient();
  const { error } = await client.storage
    .from(STORAGE_BUCKET)
    .upload(objectPath, buffer, {
      contentType: options.contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase Storage upload failed: ${error.message}`);
  }

  const { data } = client.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(objectPath);

  return data.publicUrl;
}

/**
 * Extracts the object path within the bucket from a Supabase public URL so
 * stored URLs can be deleted without an extra DB column.
 *
 * e.g. https://<proj>.supabase.co/storage/v1/object/public/uploads/user_5/a.jpg
 *      -> user_5/a.jpg
 *
 * Returns null for URLs that don't belong to this bucket (e.g. legacy paths).
 */
export function getStoragePathFromUrl(url: string): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
}

/**
 * Best-effort deletion of a previously uploaded asset. Never throws — a
 * failed remote cleanup should not block the DB operation that calls it.
 */
export async function deleteFromStorage(url: string): Promise<void> {
  const objectPath = getStoragePathFromUrl(url);
  if (!objectPath) return;

  if (!isSupabaseConfigured) {
    logger.debug(`[LOCAL] Mock delete: ${objectPath}`);
    return;
  }

  const client = getSupabaseClient();
  const { error } = await client.storage
    .from(STORAGE_BUCKET)
    .remove([objectPath]);

  if (error) {
    logger.warn(`Failed to delete Supabase asset ${objectPath}: ${error.message}`);
  }
}
