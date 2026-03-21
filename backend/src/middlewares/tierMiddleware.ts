import { Subscription, Plan } from "../models/sequelize";
import { Op } from "sequelize";

export type UserTier = "Basic Member" | "Silver" | "Gold";

export const getUserTier = async (
  userId: number,
): Promise<{ tier: UserTier; subscriptionId?: number }> => {
  try {
    const activeSub = await Subscription.findOne({
      where: {
        userId,
        status: { [Op.in]: ["active", "cancelled_pending"] },
        endDate: { [Op.gt]: new Date() },
      },
      include: [{ model: Plan }],
      order: [["endDate", "DESC"]],
    });

    if (!activeSub) {
      return { tier: "Basic Member" };
    }

    const planName = (activeSub as any).Plan?.name || "Basic Member";

    // Normalize names to our 3 tiers
    if (planName === "Gold" || planName === "Elite Gold")
      return { tier: "Gold", subscriptionId: activeSub.id };
    if (planName === "Silver")
      return { tier: "Silver", subscriptionId: activeSub.id };

    return { tier: "Basic Member", subscriptionId: activeSub.id };
  } catch (error) {
    console.error("Error identifying user tier:", error);
    return { tier: "Basic Member" };
  }
};
