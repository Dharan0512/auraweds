import { z } from "zod";
import { passwordSchema } from "../utils/passwordValidator";

/**
 * Register accepts the full onboarding payload. Core identity fields are
 * required and strongly validated; the remaining profile fields are
 * optional and passed through to the controller unchanged.
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("A valid email is required"),
    password: passwordSchema,
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    mobile: z.string().min(4, "A valid mobile number is required").optional(),
  })
  .passthrough();

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("A valid email is required"),
  password: z.string().min(1, "Password is required"),
});
