import apiClient from "../lib/apiClient";

export const profileService = {
  getMyProfile: async () => {
    const response = await apiClient.get("/profile/me");
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await apiClient.patch("/profile", profileData);
    return response.data;
  },

  saveDraft: async (draftData: { stepData: any; lastStep: number }) => {
    const response = await apiClient.post("/profile/draft", draftData);
    return response.data;
  },

  getDraft: async () => {
    const response = await apiClient.get("/profile/draft");
    return response.data;
  },

  uploadPhotos: async (formData: FormData) => {
    const response = await apiClient.post("/profile/photos", formData);
    return response.data;
  },

  deletePhoto: async (photoId: string | number) => {
    const response = await apiClient.delete(`/profile/photos/${photoId}`);
    return response.data;
  },

  uploadHoroscope: async (formData: FormData) => {
    const response = await apiClient.post("/profile/horoscope", formData);
    return response.data;
  },

  deleteHoroscope: async () => {
    const response = await apiClient.delete("/profile/horoscope");
    return response.data;
  },

  getOtherProfile: async (userId: string | number) => {
    const response = await apiClient.get(`/profile/user/${userId}`);
    return response.data;
  },

  updatePrivacySettings: async (settings: {
    privacySettings?: any;
    profileVisibility?: string;
  }) => {
    const response = await apiClient.patch("/profile/privacy", settings);
    return response.data;
  },
  searchProfiles: async (filters: any) => {
    const response = await apiClient.get("/profile/search", {
      params: filters,
    });
    return response.data;
  },
  sendInterest: async (targetUserId: string | number) => {
    const response = await apiClient.post("/interests/send", { targetUserId });
    return response.data;
  },
};
