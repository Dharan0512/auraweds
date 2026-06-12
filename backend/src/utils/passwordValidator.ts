import { z } from "zod";

/**
 * Shared password policy: min 8 chars, at least one uppercase letter,
 * one number, and one special character. Reused by Zod schemas.
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

/** Imperative variant for use outside of Zod validation. */
export const validatePassword = (password: string): PasswordValidationResult => {
  const result = passwordSchema.safeParse(password);
  return {
    valid: result.success,
    errors: result.success ? [] : result.error.issues.map((i) => i.message),
  };
};
