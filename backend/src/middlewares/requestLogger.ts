import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AuthRequest } from "./authMiddleware";

/** Logs method, path, status, and duration for every request. */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("request", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
      userId: (req as AuthRequest).user?.id,
    });
  });

  next();
};
