import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { Subscription, Plan } from "../models/sequelize";
import { Op } from "sequelize";

// Define the hierarchy of tiers based on their Plan IDs (as mapped in the controller)
const TIER_LEVELS: Record<string, number> = {
  Free: 0,
  Silver: 1,
  Gold: 2,
  "Elite Gold": 3,
};

export const requireTier = (minTier: "Silver" | "Gold" | "Elite Gold") => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }

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
            attributes: ["name"],
          },
        ],
        order: [["endDate", "DESC"]],
      });

      // Default to Free if no active sub
      const currentTierName = (activeSubscription as any)?.Plan?.name || "Free";
      const currentLevel = TIER_LEVELS[currentTierName] || 0;
      const requiredLevel = TIER_LEVELS[minTier] || 1;

      if (currentLevel < requiredLevel) {
        res.status(403).json({
          message: `This feature requires a ${minTier} subscription or higher. Please upgrade to continue.`,
          requiredTier: minTier,
          currentTier: currentTierName,
        });
        return;
      }

      next();
    } catch (error) {
      console.error("Tier checking error:", error);
      res
        .status(500)
        .json({ message: "Unable to verify subscription status." });
    }
  };
};
