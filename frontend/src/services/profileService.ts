import apiClient from "../lib/apiClient";

export const CACHE_KEY = "aura_user_summary";
export const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
export const CACHE_VERSION = 1;

export const extractUserSummary = (profileData: any) => {
  if (!profileData) return null;
  const { user, profile, photos } = profileData;
  return {
    user: {
      id: user?.id,
      firstName: user?.firstName,
      gender: user?.gender,
    },
    profile: {
      id: profile?.id,
      profileStrength: profile?.profileStrength,
      approvalStatus: profile?.approvalStatus,
      Badge: {
        mobileVerified: profile?.Badge?.mobileVerified,
        emailVerified: profile?.Badge?.emailVerified,
        premiumMember: profile?.Badge?.premiumMember,
      },
    },
    photoUrl: photos && photos.length > 0 ? photos[0].url : null,
  };
};

let myProfilePromise: Promise<any> | null = null;

export const profileService = {
  getMyProfile: async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;
          const isSameVersion = parsed.version === CACHE_VERSION;

          if (!isExpired && isSameVersion) {
            return parsed.data;
          }
        }

        // Return existing promise if one is already in flight
        if (myProfilePromise) {
          return myProfilePromise;
        }
      }

      const fetchPromise = apiClient
        .get("/profile/me")
        .then((response) => {
          const summary = extractUserSummary(response.data);

          if (summary) {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                data: summary,
                timestamp: Date.now(),
                version: CACHE_VERSION,
              }),
            );
          }

          return response.data;
        })
        .finally(() => {
          if (!forceRefresh) {
            myProfilePromise = null;
          }
        });

      if (!forceRefresh) {
        myProfilePromise = fetchPromise;
      }

      return fetchPromise;
    } catch (error) {
      console.error("Fetch profile error", error);
      throw error;
    }
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
  requestCaste: async (payload: {
    religionId: string | number;
    name: string;
  }) => {
    const response = await apiClient.post("/profile/caste-request", payload);
    return response.data;
  },
  requestSubcaste: async (payload: {
    casteId: string | number;
    name: string;
  }) => {
    const response = await apiClient.post("/profile/subcaste-request", payload);
    return response.data;
  },
};
