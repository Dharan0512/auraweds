import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Subscription, Plan, UserProfile } from "../models/sequelize";
import { Op } from "sequelize";

// Predefined Plans (Matches frontend pricing tiers exactly)
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
  "EliteGold-3M": { name: "Elite Gold", id: 7, price: 50000, months: 3 },
  "EliteGold-6M": { name: "Elite Gold", id: 8, price: 90000, months: 6 },
  "EliteGold-12M": { name: "Elite Gold", id: 9, price: 150000, months: 12 },
};

/**
 * Ensures Plan records exist in the DB (Run automatically or via an Admin seed)
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
 * Get the current subscription status for the authenticated user
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

    // A user might have multiple subscriptions. We want the active one with the furthest end date.
    const activeSubscription = await Subscription.findOne({
      where: {
        userId: req.user.id,
        status: "active",
        endDate: {
          [Op.gt]: new Date(),
        },
      },
      include: [
        {
          model: Plan,
          attributes: ["name", "id"],
        },
      ],
      order: [["endDate", "DESC"]],
    });

    if (!activeSubscription) {
      res.status(200).json({ tier: "Free", status: "None", endDate: null });
      return;
    }

    const planName = (activeSubscription as any).Plan?.name || "Free";

    res.status(200).json({
      tier: planName,
      status: activeSubscription.status,
      endDate: activeSubscription.endDate,
      subscriptionId: activeSubscription.id,
    });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    res.status(500).json({ message: "Failed to fetch subscription status." });
  }
};

/**
 * Mock Purchase a Subscription
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

    const { planKey } = req.body; // e.g., "Gold-6M"

    const planDef = PREMIUM_PLANS[planKey];
    if (!planDef) {
      res.status(400).json({ message: "Invalid subscription plan selected." });
      return;
    }

    // Ensure the Plan exists in DB
    await seedPlans();

    // Calculate End Date
    const now = new Date();
    const endDate = new Date(now.setMonth(now.getMonth() + planDef.months));

    // Optional: If user already has an active subscription, we should technically extend it
    // or upgrade it. For MVP, we will mark older ones as cancelled and create a fresh one.
    await Subscription.update(
      { status: "cancelled" },
      {
        where: {
          userId: req.user.id,
          status: "active",
        },
      },
    );

    const subscription = await Subscription.create({
      userId: req.user.id,
      planId: planDef.id,
      startDate: new Date(),
      endDate: endDate,
      status: "active",
    });

    res.status(200).json({
      message: `Successfully upgraded to ${planDef.name}!`,
      tier: planDef.name,
      endDate: subscription.endDate,
    });
  } catch (error) {
    console.error("Error purchasing subscription:", error);
    res
      .status(500)
      .json({ message: "Payment processing failed. Please try again." });
  }
};
