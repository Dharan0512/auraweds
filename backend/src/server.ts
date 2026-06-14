import express, { Request, Response } from "express";
import compression from "compression";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectPostgres } from "./config/db.postgres";
import authRoutes from "./routes/authRoutes";
import { sequelize } from "./models/sequelize"; // Ensures models are loaded for sync
import logger from "./utils/logger";
import {
  corsMiddleware,
  secureHeaders,
  apiLimiter,
  allowedOrigins,
} from "./config/security";
import { requestLogger } from "./middlewares/requestLogger";
import { globalErrorHandler, notFound } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.set("trust proxy", 1); // Trust Vercel's proxy for express-rate-limit to read client IP address
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

const PORT = process.env.PORT || 5000;

// Security & core middlewares
app.use(secureHeaders);
app.use(corsMiddleware);
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(requestLogger);
// Images are served from Supabase Storage; no local static uploads dir.

// Rate-limit all API routes
app.use("/api", apiLimiter);

/**
 * Lazy DB initialization.
 *
 * On Vercel each cold start spins up a fresh function instance, so we connect
 * once per instance (cached via initPromise) instead of relying on a long-lived
 * startServer(). This guarantees routes have a live DB connection before they run.
 */
let initPromise: Promise<void> | null = null;
const ensureInitialized = async () => {
  if (!initPromise) {
    initPromise = connectPostgres().catch((err) => {
      // Reset so the next request can retry instead of caching a failed connect.
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
};

// Ensure DB connectivity before handling any API request (serverless-safe).
app.use("/api", async (_req: Request, res: Response, next) => {
  try {
    await ensureInitialized();
    next();
  } catch (error) {
    logger.error("DB initialization failed", { error });
    res.status(503).json({ success: false, message: "Service unavailable" });
  }
});

// Health Route (verifies DB connectivity)
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "ok",
      message: "AuraWeds API is running",
      db: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({ status: "error", db: "disconnected" });
  }
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Profile Routes
import profileRoutes from "./routes/profileRoutes";
app.use("/api/profile", profileRoutes);

// Match Routes
import matchRoutes from "./routes/matchRoutes";
app.use("/api/matches", matchRoutes);

// Interest Routes
import interestRoutes from "./routes/interestRoutes";
app.use("/api/interests", interestRoutes);

// Subscription Routes
import subscriptionRoutes from "./routes/subscriptionRoutes";
app.use("/api/subscription", subscriptionRoutes);

// Master Data Routes
import masterRoutes from "./routes/masterRoutes";
app.use("/api/master", masterRoutes);

// Moderation & Success Routes
import moderationRoutes from "./routes/moderationRoutes";
app.use("/api/moderation", moderationRoutes);

// Admin Routes
import adminRoutes from "./routes/adminRoutes";
app.use("/api/admin", adminRoutes);

// 404 + centralized error handling (must be registered after all routes)
app.use(notFound);
app.use(globalErrorHandler);

import { seedMasterData } from "./config/masterSeeder";

const startServer = async () => {
  try {
    // Only connect if not already connected
    // In serverless, we do this on the first request, but for serverless we won't use startServer like this.
    await connectPostgres();

    // Sync PostgreSQL schemas
    await sequelize.sync({ alter: true });

    // Seed initial master tables if empty
    await seedMasterData();

    io.on("connection", (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      // Listen for chat messages
      socket.on("send_message", (data) => {
        // Broadcast or send to specific user using receiverId
        io.emit("receive_message", data);
      });

      // WebRTC Signaling
      socket.on("video_invite", (data) => {
        socket.broadcast.emit("video_invite", data);
      });

      socket.on("webrtc_offer", (data) => {
        socket.broadcast.emit("webrtc_offer", data);
      });

      socket.on("webrtc_answer", (data) => {
        socket.broadcast.emit("webrtc_answer", data);
      });

      socket.on("ice_candidate", (data) => {
        socket.broadcast.emit("ice_candidate", data);
      });

      socket.on("disconnect", () => {
        logger.info(`Socket disconnected: ${socket.id}`);
      });
    });

    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
};

// On Vercel (serverless) we export the Express app as the request handler and
// connect to the DB lazily per cold start. Locally we run a full HTTP server
// with socket.io support.
if (process.env.VERCEL) {
  void ensureInitialized().catch((error) =>
    logger.error("Initial DB connection failed", { error }),
  );
} else {
  startServer();
}

export default app;
