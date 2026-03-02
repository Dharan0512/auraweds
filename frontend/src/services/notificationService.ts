import apiClient from "../lib/apiClient";

export interface Notification {
  id: number;
  userId: number;
  senderId: number | null;
  type:
    | "CALL_ATTEMPT"
    | "CONNECTION_WISH"
    | "INTEREST_RECEIVED"
    | "INTEREST_ACCEPTED"
    | "PROFILE_VIEW";
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async () => {
    const response = await apiClient.get<{ notifications: Notification[] }>(
      "/notifications",
    );
    return response.data;
  },

  markAsRead: async (notificationId: number) => {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`,
    );
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get<{ count: number }>(
      "/notifications/unread-count",
    );
    return response.data;
  },
  clearAllNotifications: async () => {
    const response = await apiClient.delete("/notifications/clear-all");
    return response.data;
  },
};
