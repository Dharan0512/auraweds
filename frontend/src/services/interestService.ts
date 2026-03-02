import apiClient from "@/lib/apiClient";

export interface Interest {
  id: string | number;
  senderId?: string | number;
  receiverId?: string | number;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN" | "EXPIRED";
  createdAt: string;
  viewedAt: string | null;
  profile?: any; // The other user's profile
  isPremium?: boolean;
}

export interface InterestCounts {
  received: number;
  sent: number;
  accepted: number;
  declined: number;
}

export interface PaginatedInterests {
  total: number;
  page: number;
  limit: number;
  interests: Interest[];
}

export const interestService = {
  sendInterest: async (receiverId: string | number): Promise<void> => {
    await apiClient.post("/interests", { receiverId });
  },

  getInterests: async (
    type: string,
    page = 1,
    limit = 10,
    sortBy = "newest",
  ): Promise<PaginatedInterests> => {
    try {
      const { data } = await apiClient.get("/interests", {
        params: { type, page, limit, sortBy },
      });
      return {
        interests: data?.interests || [],
        total: data?.total || 0,
        page: data?.page || page,
        limit: data?.limit || limit,
      };
    } catch {
      return { interests: [], total: 0, page, limit };
    }
  },

  getCounts: async (): Promise<InterestCounts> => {
    try {
      const { data } = await apiClient.get("/interests/counts");
      return {
        received: data?.received || 0,
        sent: data?.sent || 0,
        accepted: data?.accepted || 0,
        declined: data?.declined || 0,
      };
    } catch {
      return { received: 0, sent: 0, accepted: 0, declined: 0 };
    }
  },

  accept: async (interestId: string | number): Promise<void> => {
    try {
      await apiClient.patch(`/interests/${interestId}/accept`);
    } catch {
      console.log("Mock: Accepted interest", interestId);
    }
  },

  decline: async (interestId: string | number): Promise<void> => {
    try {
      await apiClient.patch(`/interests/${interestId}/decline`);
    } catch {
      console.log("Mock: Declined interest", interestId);
    }
  },

  /**
   * Withdraw a pending interest (Sender only).
   */
  withdraw: async (interestId: string | number): Promise<void> => {
    try {
      await apiClient.patch(`/interests/${interestId}/withdraw`);
    } catch {
      console.log("Mock: Withdrawn interest", interestId);
    }
  },

  /**
   * Remove an interest from the list (mutual).
   */
  remove: async (interestId: string | number): Promise<void> => {
    try {
      await apiClient.delete(`/interests/${interestId}`);
    } catch {
      console.log("Mock: Removed interest", interestId);
    }
  },

  /**
   * Mark an interest as viewed for the receiver.
   */
  markAsViewed: async (interestId: string | number): Promise<void> => {
    try {
      await apiClient.post(`/interests/${interestId}/view`);
    } catch {
      console.log("Mock: Marked as viewed", interestId);
    }
  },
};
