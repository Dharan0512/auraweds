import { Request } from "express";
import multer, { FileFilterCallback } from "multer"; // Triggers type merging for Express.Multer namespace
import path from "path";
import fs from "fs";

// Upload directory (configurable via UPLOAD_DIR, defaults to ./uploads)
export const uploadDir = path.resolve(process.env.UPLOAD_DIR || "uploads");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: any, file, cb) => {
    // req.user is populated by the preceding `protect` auth middleware
    const userId = req.user?.id;
    const userDir = userId
      ? path.join(uploadDir, `user_${userId}`)
      : uploadDir;

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
  ];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExtensions.includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP, and HEIC image files are allowed!"));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
