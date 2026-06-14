import apiClient from "../lib/apiClient";

export type SubscriptionState =
  | "FREE"
  | "SILVER_ACTIVE"
  | "GOLD_ACTIVE"
  | "ELITE_ACTIVE"
  | "EXPIRED"
  | "CANCELLED_PENDING";

export interface SubscriptionStatusResponse {
  tier: "Basic Member" | "Silver" | "Gold" | "Elite Gold";
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

const SUBSCRIPTION_CACHE_KEY = "aura_subscription_status";
const SUBSCRIPTION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let subscriptionPromise: Promise<SubscriptionStatusResponse> | null = null;

export const subscriptionService = {
  /**
   * Fetch the current user's active subscription tier, state and proration data
   */
  getStatus: async (
    forceRefresh = false,
  ): Promise<SubscriptionStatusResponse> => {
    if (!forceRefresh) {
      const cached = localStorage.getItem(SUBSCRIPTION_CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < SUBSCRIPTION_CACHE_DURATION) {
            return parsed.data;
          }
        } catch (e) {
          // ignore cache error
        }
      }

      if (subscriptionPromise) {
        return subscriptionPromise;
      }
    }

    const fetchPromise = apiClient
      .get("/subscription/status")
      .then((response) => {
        localStorage.setItem(
          SUBSCRIPTION_CACHE_KEY,
          JSON.stringify({
            data: response.data,
            timestamp: Date.now(),
          }),
        );
        return response.data;
      })
      .finally(() => {
        if (!forceRefresh) {
          subscriptionPromise = null;
        }
      });

    if (!forceRefresh) {
      subscriptionPromise = fetchPromise;
    }

    return fetchPromise;
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
