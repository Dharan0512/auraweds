import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/**
 * Allowed origins are read from ALLOWED_ORIGINS (comma-separated) and
 * fall back to FRONTEND_URL / localhost for development.
 */
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  process.env.FRONTEND_URL ||
  "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim());

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients (curl, server-to-server) with no origin.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
