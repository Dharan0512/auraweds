import { Router } from "express";
import {
  getInterests,
  expressInterest,
  acceptInterest,
  declineInterest,
  withdrawInterest,
  removeInterest,
  getInterestCounts,
  markViewed,
  blockInterest,
  notifyCall,
} from "../controllers/interestController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Base interests management
router.get("/", protect, getInterests);
router.post("/", protect, expressInterest);
router.post("/send", protect, expressInterest); // Alias for frontend
router.get("/counts", protect, getInterestCounts);

// Status updates (using PATCH as requested for production-grade)
router.patch("/:id/accept", protect, acceptInterest);
router.patch("/:id/decline", protect, declineInterest);
router.patch("/:id/withdraw", protect, withdrawInterest);
router.delete("/:id", protect, removeInterest);

// Tracking
router.post("/:id/view", protect, markViewed);
router.patch("/:id/block", protect, blockInterest);
router.post("/notify-call", protect, notifyCall);

export default router;
