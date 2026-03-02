import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectPostgres } from "./config/db.postgres";
import authRoutes from "./routes/authRoutes";
import { sequelize } from "./models/sequelize"; // Ensures models are loaded for sync

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

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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

import { seedMasterData } from "./config/masterSeeder";

const startServer = async () => {
  await connectPostgres();

  // Sync PostgreSQL schemas
  await sequelize.sync({ alter: true });

  // Seed initial master tables if empty
  await seedMasterData();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

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
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
