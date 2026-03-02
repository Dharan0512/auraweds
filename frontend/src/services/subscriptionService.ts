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

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
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
   * Create a Razorpay Order
   */
  createOrder: async (planKey: string): Promise<RazorpayOrderResponse> => {
    const response = await apiClient.post("/subscription/create-order", {
      planKey,
    });
    return response.data;
  },

  /**
   * Verify Razorpay Payment
   */
  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    planKey: string;
  }): Promise<PurchaseResponse> => {
    const response = await apiClient.post("/subscription/verify-payment", data);
    return response.data;
  },

  /**
   * Join waitlist for Elite features
   */
  joinWaitlist: async (email: string, planName: string): Promise<void> => {
    await apiClient.post("/subscription/waitlist", { email, planName });
  },
};
