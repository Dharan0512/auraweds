import { Request } from "express";
import multer, { FileFilterCallback } from "multer"; // Triggers type merging for Express.Multer namespace
import path from "path";

/**
 * In-memory storage: files are kept as buffers on `req.file.buffer` and
 * streamed straight to Supabase Storage. Nothing touches the local filesystem,
 * so this works on read-only serverless platforms (e.g. Vercel /var/task).
 */
const storage = multer.memoryStorage();

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB limit
};

/**
 * Builds a multer fileFilter that accepts only the given mime types /
 * extensions and rejects everything else with a readable error.
 */
const makeFileFilter =
  (allowedMimeTypes: string[], allowedExtensions: string[], errorMsg: string) =>
  (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(new Error(errorMsg));
    }
  };

const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".heic"];

// Photos: images only.
export const upload = multer({
  storage,
  limits,
  fileFilter: makeFileFilter(
    IMAGE_MIME_TYPES,
    IMAGE_EXTENSIONS,
    "Only JPG, PNG, WEBP, and HEIC image files are allowed!",
  ),
});

// Horoscope: images or PDF.
export const uploadHoroscopeFile = multer({
  storage,
  limits,
  fileFilter: makeFileFilter(
    [...IMAGE_MIME_TYPES, "application/pdf"],
    [...IMAGE_EXTENSIONS, ".pdf"],
    "Only JPG, PNG, WEBP, HEIC, and PDF files are allowed!",
  ),
});
