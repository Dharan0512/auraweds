import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

/**
 * Validates critical environment variables at startup. In production a
 * missing or weak secret is fatal; in development we warn but allow a
 * fallback so local onboarding stays frictionless.
 */
function requireSecret(name: string, value: string | undefined): string {
  const weakDefaults = ["secret", "supersecretjwtkey_123", "change_me"];
  const isWeak = !value || value.length < 16 || weakDefaults.includes(value);

  if (isWeak) {
    const msg = `Environment variable ${name} is missing or too weak (min 16 chars, not a known default).`;
    if (isProduction) {
      logger.error(msg);
      throw new Error(msg);
    }
    logger.warn(`${msg} Using an insecure value — DO NOT deploy this.`);
  }
  return value || "insecure-dev-secret-change-me";
}

export const env = {
  isProduction,
  port: process.env.PORT || 5000,
  jwtSecret: requireSecret("JWT_SECRET", process.env.JWT_SECRET),
  jwtRefreshSecret: requireSecret(
    "JWT_REFRESH_SECRET",
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
  ),
  jwtExpiry: process.env.JWT_EXPIRY || "7d",
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || "30d",
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    bucket: process.env.SUPABASE_STORAGE_BUCKET || "uploads",
  },
};

// Supabase Storage handles all image storage (required on read-only serverless FS).
const supabaseConfigured =
  !!env.supabase.url && !!env.supabase.serviceRoleKey;

if (!supabaseConfigured) {
  const msg =
    "Supabase Storage is not configured. Set SUPABASE_URL and " +
    "SUPABASE_SERVICE_ROLE_KEY (and optionally SUPABASE_STORAGE_BUCKET).";
  if (isProduction) {
    logger.error(msg);
    throw new Error(msg);
  }
  logger.warn(`${msg} Image uploads will fail until configured.`);
}
