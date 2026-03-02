import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { Subscription, Plan } from "../models/sequelize";
import { Op } from "sequelize";

const TIER_HIERARCHY: Record<string, number> = {
  Free: 0,
  Silver: 1,
  Gold: 2,
  "Elite Gold": 3,
};

/**
 * Middleware to restrict access based on subscription tier
 * @param minTier The minimum tier required (e.g., 'Silver')
 */
export const requirePlan = (minTier: string) => {
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

      const activeSub = await Subscription.findOne({
        where: {
          userId: req.user.id,
          status: { [Op.in]: ["active", "cancelled_pending"] },
          endDate: { [Op.gt]: new Date() },
        },
        include: [{ model: Plan }],
      });

      const userTier = (activeSub as any)?.Plan?.name || "Free";

      const requiredLevel = TIER_HIERARCHY[minTier] || 0;
      const userLevel = TIER_HIERARCHY[userTier] || 0;

      if (userLevel < requiredLevel) {
        res.status(403).json({
          message: `This feature requires a ${minTier} subscription or higher.`,
          requiredTier: minTier,
          currentTier: userTier,
        });
        return;
      }

      next();
    } catch (error) {
      console.error("Plan middleware error:", error);
      res
        .status(500)
        .json({ message: "Internal server error during plan verification" });
    }
  };
};
