import apiClient from "../lib/apiClient";

export type SubscriptionState =
  | "FREE"
  | "SILVER_ACTIVE"
  | "GOLD_ACTIVE"
  | "ELITE_ACTIVE"
  | "EXPIRED"
  | "CANCELLED_PENDING";

export interface SubscriptionStatusResponse {
  tier: "Free" | "Silver" | "Gold" | "Elite Gold";
  state: SubscriptionState;
  endDate: string | null;
  remainingValue?: number;
  subscriptionId?: number;
  lastTier?: string; // For expired users
}

export interface PurchaseResponse {
  message: string;
  tier: string;
  endDate: string;
}

export const subscriptionService = {
  /**
   * Fetch the current user's active subscription tier, state and proration data
   */
  getStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await apiClient.get("/subscription/status");
    return response.data;
  },

  /**
   * Mock a purchase for a specific plan
   */
  purchase: async (planKey: string): Promise<PurchaseResponse> => {
    const response = await apiClient.post("/subscription/purchase", {
      planKey,
    });
    return response.data;
  },

  /**
   * Join waitlist for Elite features
   */
  joinWaitlist: async (email: string, planName: string): Promise<void> => {
    await apiClient.post("/subscription/waitlist", { email, planName });
  },
};
