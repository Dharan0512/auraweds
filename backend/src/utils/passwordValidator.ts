import { z } from "zod";

/**
 * Shared password policy: minimum 4 characters. Complexity requirements
 * (uppercase/number/special) are intentionally relaxed for now.
 */
export const passwordSchema = z
  .string()
  .min(4, "Password must be at least 4 characters");

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
