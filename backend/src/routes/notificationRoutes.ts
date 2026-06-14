import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
} from "../controllers/notificationController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, markAsRead);
router.patch("/read-all", protect, markAllAsRead);
router.delete("/clear-all", protect, clearAllNotifications);

export default router;
