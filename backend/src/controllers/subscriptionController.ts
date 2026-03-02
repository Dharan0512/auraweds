import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Subscription, Plan, Waitlist } from "../models/sequelize";
import { Op } from "sequelize";

// Predefined Plans
const PREMIUM_PLANS: Record<
  string,
  { name: string; id: number; price: number; months: number }
> = {
  "Silver-3M": { name: "Silver", id: 1, price: 3499, months: 3 },
  "Silver-6M": { name: "Silver", id: 2, price: 5999, months: 6 },
  "Silver-12M": { name: "Silver", id: 3, price: 9999, months: 12 },
  "Gold-3M": { name: "Gold", id: 4, price: 8000, months: 3 },
  "Gold-6M": { name: "Gold", id: 5, price: 14000, months: 6 },
  "Gold-12M": { name: "Gold", id: 6, price: 24000, months: 12 },
  "EliteGold-3M": { name: "Elite Gold", id: 10, price: 50000, months: 3 },
  "EliteGold-6M": { name: "Elite Gold", id: 11, price: 90000, months: 6 },
  "EliteGold-12M": { name: "Elite Gold", id: 12, price: 150000, months: 12 },
};

/**
 * Seed plans into DB
 */
export const seedPlans = async () => {
  for (const key in PREMIUM_PLANS) {
    const planDef = PREMIUM_PLANS[key];
    await Plan.findOrCreate({
      where: { id: planDef.id },
      defaults: {
        id: planDef.id,
        name: planDef.name,
        monthlyPrice: planDef.price,
        isActive: true,
      },
    });
  }
};

/**
 * Get Subscription Status with Intelligent State Logic
 */
export const getSubscriptionStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const now = new Date();

    // 1. Get current active/pending-cancel subscription
    const activeSub = await Subscription.findOne({
      where: {
        userId,
        status: { [Op.in]: ["active", "cancelled_pending"] },
        endDate: { [Op.gt]: now },
      },
      include: [{ model: Plan }],
      order: [["endDate", "DESC"]],
    });

    if (activeSub) {
      const planName = (activeSub as any).Plan?.name?.toUpperCase() || "FREE";
      let state = `${planName}_ACTIVE`;

      if (activeSub.status === "cancelled_pending") {
        state = "CANCELLED_PENDING";
      }

      // Calculate Remaining Value for proration
      const totalDurationDays =
        (activeSub.endDate.getTime() - activeSub.startDate.getTime()) /
        (1000 * 60 * 60 * 24);
      const remainingDays =
        (activeSub.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      const originalPrice = (activeSub as any).Plan?.monthlyPrice || 0;
      const remainingValue = Math.max(
        0,
        (remainingDays / totalDurationDays) * originalPrice,
      );

      res.status(200).json({
        tier: activeSub.Plan?.name,
        state,
        endDate: activeSub.endDate,
        remainingValue: Math.round(remainingValue),
        subscriptionId: activeSub.id,
      });
      return;
    }

    // 2. Check for Expired
    const lastSub = await Subscription.findOne({
      where: { userId },
      order: [["endDate", "DESC"]],
    });

    if (lastSub && lastSub.endDate < now) {
      res
        .status(200)
        .json({
          tier: "Free",
          state: "EXPIRED",
          lastTier: (lastSub as any).Plan?.name,
          endDate: lastSub.endDate,
        });
      return;
    }

    // 3. Default to Free
    res.status(200).json({ tier: "Free", state: "FREE", endDate: null });
  } catch (error) {
    console.error("Subscription status error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Handle Purchase / Upgrade with Proration
 */
export const purchaseSubscription = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { planKey } = req.body;
    const userId = req.user.id;
    const now = new Date();

    const planDef = PREMIUM_PLANS[planKey];
    if (!planDef) {
      res.status(400).json({ message: "Invalid plan" });
      return;
    }

    // Proration Logic
    const currentActive = await Subscription.findOne({
      where: { userId, status: "active", endDate: { [Op.gt]: now } },
      include: [{ model: Plan }],
    });

    let deduction = 0;
    if (currentActive) {
      const totalDays =
        (currentActive.endDate.getTime() - currentActive.startDate.getTime()) /
        86400000;
      const remainingDays =
        (currentActive.endDate.getTime() - now.getTime()) / 86400000;
      const originalPrice = (currentActive as any).Plan?.monthlyPrice || 0;
      deduction = (remainingDays / totalDays) * originalPrice;

      // Mark old as cancelled
      await currentActive.update({ status: "cancelled" });
    }

    const finalPrice = Math.max(0, planDef.price - deduction);
    const endDate = new Date(now.setMonth(now.getMonth() + planDef.months));

    const subscription = await Subscription.create({
      userId,
      planId: planDef.id,
      startDate: new Date(),
      endDate,
      status: "active",
    });

    res.status(200).json({
      message: `Successfully upgraded! Effective Price: ₹${Math.round(finalPrice)}`,
      tier: planDef.name,
      endDate: subscription.endDate,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({ message: "Purchase failed" });
  }
};

/**
 * Join Elite Waitlist
 */
export const joinWaitlist = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { email, planName } = req.body;
    await Waitlist.create({
      userId: req.user.id,
      email,
      planName: planName || "Elite Gold",
    });

    res.status(200).json({ message: "You've been added to the waitlist!" });
  } catch (error) {
    console.error("Waitlist error:", error);
    res.status(500).json({ message: "Failed to join waitlist" });
  }
};
