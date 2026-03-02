import { Response } from "express";
import { Op, WhereOptions } from "sequelize";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  UserPreference,
  Religion,
  Education,
  Occupation,
  EmploymentType,
  City,
  State,
  Country,
  MotherTongue,
  UserPhoto,
  Caste,
  IncomeRange,
  Currency,
  UserDraft,
  FamilyDetails,
  HoroscopeDetails,
  LocationLifestyle,
  EducationCareer,
  Badge,
} from "../models/sequelize";
import { sequelize } from "../config/db.postgres";
import { profileSerializer } from "../serializers/profileSerializer";

export const saveDraft = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const { stepData, lastStep } = req.body;

    const [draft] = await UserDraft.upsert({
      userId,
      stepData,
      lastStep,
    });

    res.status(200).json({ message: "Draft saved", draft });
  } catch (error) {
    console.error("Save draft error:", error);
    res.status(500).json({ message: "Server error saving draft" });
  }
};

export const getDraft = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const draft = await UserDraft.findOne({ where: { userId } });

    res.status(200).json(draft || { stepData: {}, lastStep: 0 });
  } catch (error) {
    console.error("Get draft error:", error);
    res.status(500).json({ message: "Server error fetching draft" });
  }
};

export const createOrUpdateProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const profileData = req.body;

    // Helper to handle empty strings or missing IDs
    const parseId = (id: any) => {
      if (id === "" || id === null || id === undefined) return null;
      const parsed = parseInt(id);
      return isNaN(parsed) ? null : parsed;
    };

    // 1. Update the base User details
    await User.update(
      {
        firstName:
          profileData.firstName || profileData.basicDetails?.name || "User",
        lastName: profileData.lastName || "",
        gender: ["Male", "Female", "Other"].includes(
          profileData.gender || profileData.basicDetails?.gender,
        )
          ? profileData.gender || profileData.basicDetails?.gender
          : "Other",
        createdFor: ["Self", "Parent", "Guardian"].includes(
          profileData.createdFor || profileData.profileType,
        )
          ? profileData.createdFor || profileData.profileType
          : "Self",
        countryCodeId: parseId(profileData.countryCodeId),
      },
      { where: { id: userId }, transaction },
    );

    // 2. Upsert UserProfile (Core Identity)
    const dobValue =
      profileData.dob || profileData.basicDetails?.dob
        ? new Date(profileData.dob || profileData.basicDetails.dob)
        : null;
    const dob = dobValue && !isNaN(dobValue.getTime()) ? dobValue : null;

    const heightVal = parseInt(profileData.height || profileData.heightCm);
    const heightCm = isNaN(heightVal) ? null : heightVal;

    const childrenCountVal = parseInt(profileData.childrenCount);
    const childrenCount = isNaN(childrenCountVal)
      ? undefined
      : childrenCountVal;

    const [userProfile] = await UserProfile.upsert(
      {
        userId,
        dob,
        heightCm,
        physicalStatus: profileData.physicalStatus || null,
        maritalStatus: profileData.maritalStatus || null,
        childrenCount,
        religionId: parseId(profileData.religionId),
        casteId: parseId(profileData.casteId),
        motherTongueId: parseId(profileData.motherTongueId),
        subcaste: profileData.subcaste || "",
        complexion: profileData.complexion || "",
        shortBio: profileData.shortBio || profileData.aboutMe || "",
        convenientTimeToCall: profileData.convenientTimeToCall || null,
        linkedInUrl: profileData.linkedInUrl || null,
        instagramUrl: profileData.instagramUrl || null,
        facebookUrl: profileData.facebookUrl || null,
        countryId: parseId(profileData.countryId),
        stateId: parseId(profileData.stateId),
        cityId: parseId(profileData.cityId),
        educationId: parseId(profileData.educationId),
        employmentTypeId: parseId(profileData.employmentTypeId),
        occupationId: parseId(profileData.occupationId),
        incomeRangeId: parseId(profileData.incomeRangeId),
        familyStatus: profileData.familyStatus || null,
        incomeCurrencyId: parseId(profileData.incomeCurrencyId),
        profileVisibility: profileData.profileVisibility || "Public",
      },
      { transaction },
    );

    const userProfileId = userProfile.id;

    // 3. Upsert FamilyDetails
    await FamilyDetails.upsert(
      {
        userProfileId,
        fatherName: profileData.fatherName || null,
        fatherOccupation: profileData.fatherOccupation || null,
        motherName: profileData.motherName || null,
        motherOccupation: profileData.motherOccupation || null,
        familyType: profileData.familyType || null,
        familyStatus: profileData.familyStatus || null,
        siblingsCount: isNaN(parseInt(profileData.siblingsCount))
          ? undefined
          : parseInt(profileData.siblingsCount),
        ownHouse:
          profileData.ownHouse === true || profileData.ownHouse === "true",
        nativeDistrict: profileData.nativeDistrict || null,
        familyLocation: profileData.familyLocation || null,
      },
      { transaction },
    );

    // 4. Upsert HoroscopeDetails
    await HoroscopeDetails.upsert(
      {
        userProfileId,
        star: profileData.star || null,
        rasi: profileData.rasi || null,
        laknam: profileData.laknam || null,
        gothram: profileData.gothram || null,
        sevvaiDhosham: profileData.sevvaiDhosham || null,
        rahuKetuDhosham: profileData.rahuKetuDhosham || null,
        birthTime: profileData.birthTime || null,
        birthPlace: profileData.birthPlace || null,
      },
      { transaction },
    );

    // 5. Upsert LocationLifestyle
    await LocationLifestyle.upsert(
      {
        userProfileId,
        country: profileData.country || null,
        state: profileData.state || null,
        city: profileData.city || null,
        relocatePreference: profileData.relocatePreference || null,
        diet: profileData.diet || null,
        drink: profileData.drink || null,
        smoke: profileData.smoke || null,
        fitnessLevel: profileData.fitnessLevel || null,
        ambition: parseId(profileData.ambition),
        familyOrientation: parseId(profileData.familyOrientation),
        emotionalStability: parseId(profileData.emotionalStability),
        communicationStyle: parseId(profileData.communicationStyle),
        spiritualInclination: parseId(profileData.spiritualInclination),
        languages: profileData.languages || [],
        hobbies: profileData.hobbies || [],
      },
      { transaction },
    );

    // 6. Upsert EducationCareer
    await EducationCareer.upsert(
      {
        userProfileId,
        highestEducation: profileData.highestEducation || null,
        fieldOfStudy: profileData.fieldOfStudy || null,
        college: profileData.college || null,
        employmentType: profileData.employmentType || null,
        companyName: profileData.companyName || null,
        designation: profileData.designation || null,
        incomeRange: profileData.incomeRange || null,
        exactIncome: profileData.exactIncome
          ? parseInt(profileData.exactIncome)
          : null,
        careerPlanAfterMarriage: profileData.careerPlanAfterMarriage || null,
      },
      { transaction },
    );

    // 7. Upsert UserPreference
    await UserPreference.upsert(
      {
        userId,
        minAge: parseInt(profileData.partnerAgeMin) || 18,
        maxAge: parseInt(profileData.partnerAgeMax) || 40,
        minHeightCm: parseInt(profileData.partnerHeightMin) || null,
        maxHeightCm: parseInt(profileData.partnerHeightMax) || null,
        maritalStatus: profileData.partnerMaritalStatus || null,
        religionId: parseId(profileData.partnerReligion),
        casteId: parseId(profileData.partnerCaste),
        partnerCastes: profileData.partnerCastes || [],
        preferredLocation:
          profileData.partnerLocationPreference ||
          profileData.preferredLocation ||
          null,
        preferredEducation:
          profileData.partnerEducation ||
          profileData.preferredEducation ||
          null,
        preferredIncomeRange: profileData.preferredIncomeRange || null,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(200).json({
      message: "Profile updated successfully",
      profile: userProfile,
    });
  } catch (error: any) {
    if (transaction) await transaction.rollback();
    console.error("Detailed Profile Save Error:", error);
    res.status(500).json({
      message: "Server error saving profile",
      details: error.message,
    });
  }
};

export const getMyProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const userProfile = await UserProfile.findOne({
      where: { userId },
      include: [
        Religion,
        City,
        State,
        Country,
        MotherTongue,
        Caste,
        FamilyDetails,
        HoroscopeDetails,
        LocationLifestyle,
        EducationCareer,
        Badge,
      ],
    });
    const preferences = await UserPreference.findOne({
      where: { userId },
      include: [Religion, Education, Country, State],
    });
    const userPhotos = await UserPhoto.findAll({
      where: { userId },
      order: [["order", "ASC"]],
    });

    if (!userProfile) {
      res.status(200).json({
        user,
        profile: null,
        preferences: null,
        photos: userPhotos.map((p) => ({ id: p.id, url: p.url })),
      });
      return;
    }

    res.status(200).json({
      user,
      profile: userProfile,
      preferences,
      photos: userPhotos.map((p) => ({ id: p.id, url: p.url })),
    });
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

export const uploadPhotos = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    // req.file is populated by multer
    const file = (req as any).file;

    if (!file) {
      res.status(400).json({ message: "Please upload a file" });
      return;
    }

    // In a real app, you'd upload to S3/Cloudinary and get a URL
    // For now, we'll use a local path or a mock URL
    const photoUrl = `/uploads/${file.filename}`;

    const photo = await UserPhoto.create({
      userId,
      url: photoUrl,
      isMain: false,
    });

    res.status(201).json({
      message: "Photo uploaded successfully",
      photo,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    res.status(500).json({ message: "Server error uploading photo" });
  }
};

export const deletePhoto = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const { photoId } = req.params;

    const photo = await UserPhoto.findOne({
      where: { id: photoId, userId },
    });

    if (!photo) {
      res.status(404).json({ message: "Photo not found or unauthorized" });
      return;
    }

    // Optional: Delete physical file from uploads folder if using local storage
    // const fs = require('fs');
    // const path = require('path');
    // const filePath = path.join(__dirname, '../../', photo.url);
    // if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await photo.destroy();

    res.status(200).json({
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Photo delete error:", error);
    res.status(500).json({ message: "Server error deleting photo" });
  }
};
export const uploadHoroscope = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const file = (req as any).file;

    if (!file) {
      res.status(400).json({ message: "Please upload a file" });
      return;
    }

    const imageUrl = `/uploads/${file.filename}`;

    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    const [horoscope] = await HoroscopeDetails.upsert({
      userProfileId: profile.id,
      horoscopeImageUrl: imageUrl,
    });

    res.status(200).json({
      message: "Horoscope uploaded successfully",
      horoscope,
    });
  } catch (error) {
    console.error("Horoscope upload error:", error);
    res.status(500).json({ message: "Server error uploading horoscope" });
  }
};

export const deleteHoroscope = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    const horoscope = await HoroscopeDetails.findOne({
      where: { userProfileId: profile.id },
    });

    if (!horoscope || !horoscope.horoscopeImageUrl) {
      res.status(404).json({ message: "Horoscope image not found" });
      return;
    }

    // Optional: Delete physical file
    // const fs = require('fs');
    // const path = require('path');
    // const filePath = path.join(process.cwd(), horoscope.horoscopeImageUrl);
    // if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    horoscope.horoscopeImageUrl = null;
    await horoscope.save();

    res.status(200).json({
      message: "Horoscope image deleted successfully",
    });
  } catch (error) {
    console.error("Horoscope delete error:", error);
    res.status(500).json({ message: "Server error deleting horoscope" });
  }
};

export const getOtherProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const targetUserId = req.params.id;
    if (!targetUserId) {
      res.status(400).json({ message: "User ID required" });
      return;
    }

    const parsedId = parseInt(targetUserId as string);
    if (isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid User ID" });
      return;
    }

    const user = await User.findByPk(parsedId, {
      attributes: { exclude: ["password", "email", "mobile", "countryCodeId"] }, // Protect PII
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userProfile = await UserProfile.findOne({
      where: { userId: parsedId },
      include: [
        Religion,
        City,
        State,
        Country,
        MotherTongue,
        Caste,
        FamilyDetails,
        HoroscopeDetails,
        LocationLifestyle,
        EducationCareer,
        Badge,
      ],
    });

    if (!userProfile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    if (userProfile.profileVisibility === "Hidden") {
      res.status(403).json({ message: "This profile is private." });
      return;
    }

    if (userProfile.profileVisibility === "Members Only") {
      if (!req.user) {
        res
          .status(401)
          .json({ message: "You must be logged in to view this profile." });
        return;
      }
    }

    const userPhotos = await UserPhoto.findAll({
      where: { userId: targetUserId },
      order: [["order", "ASC"]],
    });

    // Setup Default Privacy fallback
    const defaultPrivacy = {
      showExactIncome: false,
      showFamilyDetails: true,
      showBirthDetails: true,
      showSocialLinks: true,
      showValues: true,
      showHoroscope: true,
      showAstroMatch: true,
    };

    const privacy = userProfile.privacySettings
      ? { ...defaultPrivacy, ...userProfile.privacySettings }
      : defaultPrivacy;

    const safeProfile = userProfile.toJSON() as any;

    // 1. Exact income
    if (!privacy.showExactIncome && safeProfile.EducationCareer) {
      delete safeProfile.EducationCareer.exactIncome;
    }

    // 2. Family Details
    if (!privacy.showFamilyDetails) {
      delete safeProfile.FamilyDetails; // Note plural to match association
      delete safeProfile.FamilyDetail; // Fallback just in case
    }

    // 3. Birth details & Gothram
    if (!privacy.showBirthDetails && safeProfile.HoroscopeDetails) {
      delete safeProfile.HoroscopeDetails.birthTime;
      delete safeProfile.HoroscopeDetails.birthPlace;
      delete safeProfile.HoroscopeDetails.gothram;
    }
    if (!privacy.showBirthDetails && safeProfile.HoroscopeDetail) {
      delete safeProfile.HoroscopeDetail.birthTime;
      delete safeProfile.HoroscopeDetail.birthPlace;
      delete safeProfile.HoroscopeDetail.gothram;
    }

    // 4. Values ratings
    if (!privacy.showValues && safeProfile.LocationLifestyle) {
      delete safeProfile.LocationLifestyle.ambition;
      delete safeProfile.LocationLifestyle.familyOrientation;
      delete safeProfile.LocationLifestyle.emotionalStability;
      delete safeProfile.LocationLifestyle.communicationStyle;
      delete safeProfile.LocationLifestyle.spiritualInclination;
    }

    // 5. Social Links
    if (!privacy.showSocialLinks) {
      delete safeProfile.linkedInUrl;
      delete safeProfile.instagramUrl;
      delete safeProfile.facebookUrl;
    }

    // 6. Horoscope
    if (!privacy.showHoroscope) {
      delete safeProfile.HoroscopeDetails;
      delete safeProfile.HoroscopeDetail;
    }

    res.status(200).json({
      user,
      profile: safeProfile,
      photos: userPhotos.map((p) => ({ id: p.id, url: p.url })),
      privacySettings: privacy, // Optional: for frontend to know what it is allowed to show functionally (e.g for "showAstroMatch")
    });
  } catch (error) {
    console.error("Fetch other profile error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

export const updatePrivacySettings = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const { privacySettings, profileVisibility } = req.body;

    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    if (privacySettings) {
      const allowedKeys = [
        "showExactIncome",
        "showFamilyDetails",
        "showBirthDetails",
        "showSocialLinks",
        "showValues",
        "showHoroscope",
        "showAstroMatch",
      ];

      const safePrivacySettings: any = {};

      for (const key of allowedKeys) {
        if (privacySettings[key] !== undefined) {
          safePrivacySettings[key] = Boolean(privacySettings[key]);
        }
      }

      profile.privacySettings = {
        ...profile.privacySettings,
        ...safePrivacySettings,
      };
    }

    if (profileVisibility) {
      profile.profileVisibility = profileVisibility;
    }

    await profile.save();

    res.status(200).json({
      message: "Privacy settings updated successfully",
      privacySettings: profile.privacySettings,
      profileVisibility: profile.profileVisibility,
    });
  } catch (error) {
    console.error("Update privacy error:", error);
    res.status(500).json({ message: "Server error updating privacy settings" });
  }
};

export const searchProfiles = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const {
      ageMin,
      ageMax,
      cityId,
      stateId,
      religionId,
      maritalStatus,
      educationId,
      occupationId,
      heightMin,
      heightMax,
      motherTongueId,
      diet,
      incomeRangeId,
      casteId,
      familyStatus,
      smoking,
      drinking,
      isVerified,
      profileStrength,
      sort,
    } = req.query;

    const myUser = await User.findByPk(req.user.id);
    let oppositeGender = "Female"; // Default fallback
    if (myUser?.gender === "Female") oppositeGender = "Male";
    else if (myUser?.gender === "Male") oppositeGender = "Female";

    const where: WhereOptions = {
      userId: { [Op.ne]: req.user.id },
      [Op.or]: [
        { profileVisibility: { [Op.ne]: "Hidden" } },
        { profileVisibility: null },
      ],
    };

    const userWhere: any = {
      gender: oppositeGender,
    };

    if (ageMin || ageMax) {
      const today = new Date();
      const minDate = ageMax
        ? new Date(
            today.getFullYear() - Number(ageMax) - 1,
            today.getMonth(),
            today.getDate(),
          )
        : null;
      const maxDate = ageMin
        ? new Date(
            today.getFullYear() - Number(ageMin),
            today.getMonth(),
            today.getDate(),
          )
        : null;

      where.dob = {};
      if (minDate) where.dob[Op.gte] = minDate;
      if (maxDate) where.dob[Op.lte] = maxDate;
    }

    if (cityId) where.cityId = cityId;
    if (stateId) where.stateId = stateId;
    if (religionId) where.religionId = religionId;
    if (maritalStatus) where.maritalStatus = maritalStatus;
    if (educationId) where.educationId = educationId;
    if (occupationId) where.occupationId = occupationId;
    if (motherTongueId) where.motherTongueId = motherTongueId;
    if (incomeRangeId) where.incomeRangeId = incomeRangeId;
    if (casteId) where.casteId = casteId;
    if (profileStrength)
      where.profileStrength = { [Op.gte]: Number(profileStrength) };

    if (heightMin || heightMax) {
      where.heightCm = {};
      if (heightMin) where.heightCm[Op.gte] = Number(heightMin);
      if (heightMax) where.heightCm[Op.lte] = Number(heightMax);
    }

    const lifestyleWhere: any = {};
    if (diet) lifestyleWhere.diet = diet;
    if (smoking) lifestyleWhere.smoke = smoking;
    if (drinking) lifestyleWhere.drink = drinking;

    const familyWhere: any = {};
    if (familyStatus) familyWhere.familyStatus = familyStatus;

    const badgeWhere: any = {};
    if (isVerified === "true") badgeWhere.mobileVerified = true;

    let order: any = [["createdAt", "DESC"]];
    if (sort === "recentlyJoined") order = [["createdAt", "DESC"]];
    if (sort === "recentlyActive") order = [["updatedAt", "DESC"]]; // Simple fallback for recently active
    if (sort === "profileScore") order = [["profileStrength", "DESC"]];
    if (sort === "mostCompatible") order = [["matchScore", "DESC"]]; // Fallback to matchScore

    const includes: any[] = [
      {
        model: User,
        where: userWhere,
        attributes: ["id", "firstName", "lastName", "gender"],
        include: [
          {
            model: UserPhoto,
            as: "photos",
            required: false,
          },
        ],
      },
      Religion,
      City,
      Education,
      Occupation,
      MotherTongue,
      Caste,
      IncomeRange,
    ];

    if (Object.keys(lifestyleWhere).length > 0) {
      includes.push({
        model: LocationLifestyle,
        where: lifestyleWhere,
        required: true,
      });
    }

    if (Object.keys(familyWhere).length > 0) {
      includes.push({
        model: FamilyDetails,
        where: familyWhere,
        required: true,
      });
    }

    if (Object.keys(badgeWhere).length > 0) {
      includes.push({
        model: Badge,
        where: badgeWhere,
        required: true,
      });
    }

    const { count, rows: results } = await UserProfile.findAndCountAll({
      where,
      include: includes,
      order,
      limit: 50,
    });

    const serializedResults = results.map((p) =>
      profileSerializer.toPublicProfile(p),
    );

    res.status(200).json({
      total: count,
      results: serializedResults,
    });
  } catch (error) {
    console.error("Search profiles error:", error);
    res.status(500).json({ message: "Server error searching profiles" });
  }
};
