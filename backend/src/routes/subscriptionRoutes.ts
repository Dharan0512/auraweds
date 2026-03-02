import { Router } from "express";
import {
  getSubscriptionStatus,
  createRazorpayOrder,
  verifyRazorpayPayment,
  joinWaitlist,
} from "../controllers/subscriptionController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// GET /api/subscription/status
router.get("/status", protect, getSubscriptionStatus);

// POST /api/subscription/create-order
router.post("/create-order", protect, createRazorpayOrder);

// POST /api/subscription/verify-payment
router.post("/verify-payment", protect, verifyRazorpayPayment);

// POST /api/subscription/waitlist
router.post("/waitlist", protect, joinWaitlist);

export default router;
