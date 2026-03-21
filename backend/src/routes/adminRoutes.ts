import { Router } from "express";
import {
  getDashboardStats,
  getUsers,
  updateUserStatus,
} from "../controllers/adminController";
import {
  getPendingApprovals,
  getReports,
  approveProfile,
  rejectProfile,
  approvePhoto,
  rejectPhoto,
} from "../controllers/moderationController";
import { protect, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

// All routes here require admin privileges
router.use(protect, isAdmin);

router.get("/stats", getDashboardStats);
router.get("/users", getUsers);
router.patch("/users/:userId/status", updateUserStatus);

// Moderation
router.get("/reports", getReports);
router.get("/moderation/pending", getPendingApprovals);
router.patch("/moderation/profile/:profileId/approve", approveProfile);
router.patch("/moderation/profile/:profileId/reject", rejectProfile);
router.patch("/moderation/photo/:photoId/approve", approvePhoto);
router.patch("/moderation/photo/:photoId/reject", rejectPhoto);

export default router;
