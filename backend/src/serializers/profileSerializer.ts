import {
  User,
  UserProfile,
  Religion,
  City,
  Education,
} from "../models/sequelize";
import { maskPhoneNumber } from "../utils/phoneUtils";

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
        heightCm: profile.heightCm,
        physicalStatus: profile.physicalStatus,
        maritalStatus: profile.maritalStatus,
        caste: (profile as any).Caste?.name || null,
        // Prefer the structured subcaste name, fall back to the legacy free-text value.
        subcaste: (profile as any).Subcaste?.name || profile.subcaste || null,
        shortBio: profile.shortBio,
        // Disclose contact info only if explicitly requested, otherwise mask phone number
        mobile: maskPhoneNumber(user?.mobile, includeContact),
        email: includeContact ? user?.email : undefined,
      },
      professionalInfo: {
        education: educationName,
        highestEducation: profile.EducationCareer?.highestEducation,
        employmentType: profile.EducationCareer?.employmentType,
        profession: profile.Occupation?.name || "Not specified",
        designation: profile.EducationCareer?.designation,
        companyName: profile.EducationCareer?.companyName,
        incomeRange: (profile as any).IncomeRange?.name || "Not specified",
      },
      photos: (user as any)?.photos?.map((p: any) => p.url) || [],
      lifestyle: {
        diet: profile.LocationLifestyle?.diet || profile.diet,
        smoke: profile.LocationLifestyle?.smoke || profile.smoke,
        drink: profile.LocationLifestyle?.drink || profile.drink,
        relocatePreference: profile.LocationLifestyle?.relocatePreference || profile.relocatePreference,
        familyStatus: profile.familyStatus,
        convenientTimeToCall: profile.convenientTimeToCall,
      },
      familyRoots: profile.FamilyDetails ? {
        fatherName: profile.FamilyDetails.fatherName,
        fatherOccupation: profile.FamilyDetails.fatherOccupation,
        motherName: profile.FamilyDetails.motherName,
        motherOccupation: profile.FamilyDetails.motherOccupation,
        familyType: profile.FamilyDetails.familyType,
        siblingsCount: profile.FamilyDetails.siblingsCount,
        ownHouse: profile.FamilyDetails.ownHouse,
        nativeDistrict: profile.FamilyDetails.nativeDistrict,
      } : null,
      horoscope: profile.HoroscopeDetails
        ? {
            star:
              profile.HoroscopeDetails.Star?.name ||
              profile.HoroscopeDetails.star,
            rasi:
              profile.HoroscopeDetails.Rasi?.name ||
              profile.HoroscopeDetails.rasi,
            laknam:
              profile.HoroscopeDetails.Laknam?.name ||
              profile.HoroscopeDetails.laknam,
            gothram:
              profile.HoroscopeDetails.Gothram?.name ||
              profile.HoroscopeDetails.gothram,
            sevvaiDhosham: profile.HoroscopeDetails.sevvaiDhosham,
            rahuKetuDhosham: profile.HoroscopeDetails.rahuKetuDhosham,
            birthTime: profile.HoroscopeDetails.birthTime,
            birthPlace:
              profile.HoroscopeDetails.BirthCity?.name ||
              profile.HoroscopeDetails.birthPlace,
            horoscopeImageUrl: profile.HoroscopeDetails.horoscopeImageUrl,
          }
        : null,
      matchScore: Math.floor(Math.random() * (98 - 75 + 1) + 75), // Future: Implement real algorithm
      hasSentInterest: hasSentInterest || !!(profile as any).hasSentInterest,
    };
  },
};
