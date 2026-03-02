import { Router } from "express";
import {
  getSubscriptionStatus,
  purchaseSubscription,
  joinWaitlist,
} from "../controllers/subscriptionController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// GET /api/subscription/status
// Retrieves the current user's active subscription tier and expiry date
router.get("/status", protect, getSubscriptionStatus);

// POST /api/subscription/purchase
// Mocks a purchase transaction and assigns the subscription
router.post("/purchase", protect, purchaseSubscription);

// POST /api/subscription/waitlist
// Join the waitlist for Elite plan
router.post("/waitlist", protect, joinWaitlist);

export default router;
