import {
  User,
  UserProfile,
  Religion,
  City,
  Education,
} from "../models/sequelize";

/**
 * Serializes a full profile into the 'legacyFormat' (wizard-compatible) shape.
 * This is the single place to manage field mapping between the DB and the Frontend UI.
 */
export const profileSerializer = {
  /**
   * Formats a user and their related profile/preferences for match lists and profile views.
   */
  toPublicProfile: (
    profile: any,
    hasSentInterest: boolean = false,
    includeContact: boolean = false,
  ) => {
    // If handle is a Sequelize instance, we can extract models
    const user = (profile as any).User as User;

    // Fallback names for master data
    const religionName = (profile as any).Religion?.name || "Other";
    const cityName = (profile as any).City?.name || "Other";
    const educationName = (profile as any).Education?.name || "Other";

    return {
      userId: user?.id || (profile as any).userId,
      basicDetails: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        gender: user?.gender || "",
        dob: profile.dob || "",
        religion: religionName,
        location: cityName,
        // Disclose contact info only if explicitly requested (Gold users with accepted interest)
        mobile: includeContact ? user?.mobile : undefined,
        email: includeContact ? user?.email : undefined,
      },
      professionalInfo: {
        education: educationName,
        profession: (profile as any).Occupation?.name || "Not specified",
        incomeRange: (profile as any).IncomeRange?.name || "Not specified",
      },
      photos: (user as any)?.photos?.map((p: any) => p.url) || [],
      lifestyle: {
        diet: profile.diet,
        smoke: profile.smoke,
        drink: profile.drink,
      },
      matchScore: Math.floor(Math.random() * (98 - 75 + 1) + 75), // Future: Implement real algorithm
      hasSentInterest: hasSentInterest || !!(profile as any).hasSentInterest,
    };
  },
};
