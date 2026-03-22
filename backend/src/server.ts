import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectPostgres } from "./config/db.postgres";
import authRoutes from "./routes/authRoutes";
import { sequelize } from "./models/sequelize"; // Ensures models are loaded for sync
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

const PORT = process.env.PORT || 5000;
const isServerless = process.env.VERCEL === "1";
export const uploadDir = isServerless
  ? "/tmp/uploads"
  : path.join(process.cwd(), "uploads");
// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// ✅ 👉 ADD HERE (important position)
let isInitialized = false;

const init = async () => {
  if (!isInitialized) {
    await connectPostgres();
    await sequelize.sync({ alter: true });
    await seedMasterData();
    console.log("DB initialized");
    isInitialized = true;
  }
};

app.use(async (req, res, next) => {
  await init();
  next();
});

// --- Diagnostics Routes ---
const availableRoutes = [
  "/",
  "/api",
  "/api/health",
  "/api/auth",
  "/api/profile",
  "/api/matches",
  "/api/interests",
  "/api/subscription",
  "/api/master",
  "/api/moderation",
  "/api/notifications",
  "/api/admin",
];

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "AuraWeds Backend API is live on Vercel!",
    routes: availableRoutes,
    timestamp: new Date().toISOString(),
  });
});

// Basic Route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "AuraWeds API is running" });
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

// Notification Routes
import notificationRoutes from "./routes/notificationRoutes";
app.use("/api/notifications", notificationRoutes);

// Admin Routes
import adminRoutes from "./routes/adminRoutes";
app.use("/api/admin", adminRoutes);

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
    console.log("Database connected and schema synced successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

// Start the database connection process
// For Vercel Serverless, we invoke startServer() so the DB connects asynchronously.
// The first API request might experience a slight delay, but subsequent requests will reuse the instance.
// startServer();

// Socket.io removed for Vercel compatibility, as Serverless functions are stateless
// and do not natively support WebSockets effectively.

// Only listen locally, Vercel will export the app instead

app.get("/debug-pg", (req, res) => {
  try {
    const pg = require("pg");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
