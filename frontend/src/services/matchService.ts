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
};
