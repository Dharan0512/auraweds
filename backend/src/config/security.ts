import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import logger from "../utils/logger";

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/$/, "");

/**
 * Allowed origins are read from ALLOWED_ORIGINS (comma-separated) and
 * fall back to FRONTEND_URL / localhost for development.
 */
const allowedOrigins = [
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : []),
  process.env.FRONTEND_URL,
  "https://aurawebpro.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
]
  .filter(Boolean)
  .map((origin) => normalizeOrigin(origin!));

/**
 * Allow Vercel preview/production deployments (e.g. aurawebpro-git-*.vercel.app)
 * unless explicitly disabled. Set ALLOW_VERCEL_PREVIEWS=false to lock this down.
 */
const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS !== "false";
const vercelPreviewPattern = /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i;

const isOriginAllowed = (origin: string) => {
  const normalized = normalizeOrigin(origin);
  if (allowedOrigins.includes(normalized)) return true;
  if (allowVercelPreviews && vercelPreviewPattern.test(normalized)) return true;
  return false;
};

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients (curl, server-to-server) with no origin.
    if (!origin || isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      logger.warn(`Blocked CORS request from origin: ${origin}`);
      // Don't throw — returning false sends a clean response without
      // CORS headers instead of bubbling a 500 to the error handler.
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

export const corsMiddleware = cors(corsOptions);

export const secureHeaders = helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // allow /uploads images cross-origin
});

/** Strict limiter for auth endpoints (brute-force protection). */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts, please try again later." },
});

/** General limiter for the rest of the API. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please slow down." },
});

export { allowedOrigins };
