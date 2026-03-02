import apiClient from "../lib/apiClient";

export interface MatchProfile {
  userId: string;
  basicDetails: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    religion: string;
    caste: string;
    location: string;
    nativeDistrict: string;
    height: string;
    maritalStatus: string;
    motherTongue: string;
    mobile?: string;
    email?: string;
  };
  professionalInfo: {
    education: string;
    profession: string;
    incomeRange: string;
    employmentType: string;
  };
  personalityTraits: {
    ambition: number;
    familyOrientation: number;
    spiritualInclination: number;
  };
  photos: string[];
  horoscopeImageUrl?: string;
  badge: {
    mobileVerified: boolean;
    horoscopeAvailable: boolean;
    adminApproved: boolean;
  };
  matchScore: number;
  hasSentInterest?: boolean;
  interestSent?: boolean;
  isPremiumMatch?: boolean;
}

export const matchService = {
  getDailyMatches: async (): Promise<MatchProfile[]> => {
    try {
      const response = await apiClient.get("/matches/daily");
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  },

  getViewers: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get("/profile/viewers");
      return response.data?.viewers || [];
    } catch {
      return [];
    }
  },
};
