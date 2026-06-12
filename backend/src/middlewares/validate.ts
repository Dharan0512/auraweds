import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

/**
 * Validates and coerces req.body against a Zod schema. On success the
 * parsed (and typed) value replaces req.body; on failure responds 400
 * with field-level error details.
 */
export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
