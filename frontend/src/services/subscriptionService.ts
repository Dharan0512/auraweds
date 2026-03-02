import apiClient from "../lib/apiClient";

export interface SubscriptionStatusResponse {
  tier: "Free" | "Silver" | "Gold" | "Elite Gold";
  status: "Active" | "Expired" | "Cancelled" | "None";
  endDate: string | null;
  subscriptionId?: number;
}

export interface PurchaseResponse {
  message: string;
  tier: string;
  endDate: string;
}

export const subscriptionService = {
  /**
   * Fetch the current user's active subscription tier and expiry
   */
  getStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await apiClient.get("/subscription/status");
    return response.data;
  },

  /**
   * Mock a purchase for a specific plan
   * @param planKey Needs to match the backend dictionary (e.g., 'Gold-6M')
   */
  purchase: async (planKey: string): Promise<PurchaseResponse> => {
    const response = await apiClient.post("/subscription/purchase", {
      planKey,
    });
    return response.data;
  },
};
