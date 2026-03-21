import { useState, useEffect } from "react";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";

export const useSubscription = () => {
  const [status, setStatus] = useState<SubscriptionStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await subscriptionService.getStatus();
      setStatus(data);
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      // Fallback to Basic Member
      setStatus({
        tier: "Basic Member",
        state: "FREE",
        endDate: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const currentTier = status?.tier || "Basic Member";

  return {
    status,
    loading,
    refreshStatus: fetchStatus,
    tier: currentTier,
    isPremium: currentTier !== "Basic Member",
    isGold: currentTier === "Gold" || currentTier === "Elite Gold",
    isSilver: currentTier === "Silver",
  };
};
