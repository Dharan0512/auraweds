import type sharpType from "sharp";

/**
 * Result of optimizing a raster image. The output is always WebP, which is
 * ~25-35% smaller than JPEG at equal quality and supported by all current
 * browsers.
 */
export interface OptimizedImage {
  buffer: Buffer;
  contentType: string;
  ext: string;
}

/**
 * Lazily load sharp. Its native binary can fail to load on some serverless
 * runtimes; importing it at module top-level would crash the entire API on
 * startup. Loading it on first use keeps a sharp failure scoped to image
 * optimization, where callers already fall back to the original buffer.
 */
let sharp: typeof sharpType | null = null;
const getSharp = (): typeof sharpType => {
  if (!sharp) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sharp = require("sharp") as typeof sharpType;
  }
  return sharp;
};

// Cap the longest edge. Matrimony photos are displayed at modest sizes, so
// anything larger than this is wasted bytes. Aspect ratio is preserved and
// images smaller than this are never upscaled.
const MAX_DIMENSION = 1280;
const DEFAULT_QUALITY = 80;

/**
 * Resizes, re-compresses, and strips metadata from a raster image buffer,
 * returning a WebP buffer. Throws if the buffer isn't a sharp-decodable image
 * (e.g. a PDF, or HEIC on a libheif-less build) — callers should fall back to
 * the original buffer in that case.
 */
export async function optimizeImage(
  buffer: Buffer,
  opts: { maxDimension?: number; quality?: number } = {},
): Promise<OptimizedImage> {
  const maxDimension = opts.maxDimension ?? MAX_DIMENSION;
  const quality = opts.quality ?? DEFAULT_QUALITY;

  const output = await getSharp()(buffer)
    .rotate() // apply EXIF orientation before metadata is dropped
    .resize(maxDimension, maxDimension, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();

  return { buffer: output, contentType: "image/webp", ext: ".webp" };
}
