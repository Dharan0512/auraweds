import { Response } from "express";
import { Op, WhereOptions } from "sequelize";
import fs from "fs";
import path from "path";
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
  Subcaste,
  IncomeRange,
  CasteRequest,
  SubcasteRequest,
  Currency,
  UserDraft,
  FamilyDetails,
  HoroscopeDetails,
  LocationLifestyle,
  EducationCareer,
  Badge,
  Subscription,
  Plan,
  Interest,
  Notification,
  ProfileView,
  Star,
  Gothram,
  Laknam,
  Rasi,
} from "../models/sequelize";
import { sequelize } from "../config/db.postgres";
import { profileSerializer } from "../serializers/profileSerializer";
import { getUserTier } from "../middlewares/tierMiddleware";
import { PhoneViewLog } from "../models/sequelize/PhoneViewLog";
import { maskPhoneNumber } from "../utils/phoneUtils";

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

    // 1. Update the base User details - Partial Update
    const userUpdate: any = {};
    if (profileData.firstName !== undefined || profileData.basicDetails?.name !== undefined) {
      userUpdate.firstName = profileData.firstName || profileData.basicDetails?.name || "User";
    }
    if (profileData.lastName !== undefined) userUpdate.lastName = profileData.lastName;
    if (profileData.gender !== undefined || profileData.basicDetails?.gender !== undefined) {
      const g = profileData.gender || profileData.basicDetails?.gender;
      if (["Male", "Female", "Other"].includes(g)) userUpdate.gender = g;
    }
    if (profileData.createdFor !== undefined || profileData.profileType !== undefined) {
      const cf = profileData.createdFor || profileData.profileType;
      if (["Self", "Parent", "Guardian", "Friend", "Sister", "Brother", "Daughter", "Son", "Relative"].includes(cf)) {
        userUpdate.createdFor = cf === "Myself" ? "Self" : cf; // Map back to DB standard if needed
      }
    }
    if (profileData.countryCodeId !== undefined) userUpdate.countryCodeId = parseId(profileData.countryCodeId);

    if (Object.keys(userUpdate).length > 0) {
      await User.update(userUpdate, { where: { id: userId }, transaction });
    }

    // 2. Upsert UserProfile (Core Identity) - Partial Update
    const profileUpdate: any = { userId };
    
    if (profileData.dob !== undefined || profileData.basicDetails?.dob !== undefined) {
      const d = profileData.dob || profileData.basicDetails?.dob;
      const dobDate = d ? new Date(d) : null;
      profileUpdate.dob = dobDate && !isNaN(dobDate.getTime()) ? dobDate : null;
    }
    
    if (profileData.height !== undefined || profileData.heightCm !== undefined) {
      const h = parseInt(profileData.height || profileData.heightCm);
      profileUpdate.heightCm = isNaN(h) ? null : h;
    }
    
    if (profileData.physicalStatus !== undefined) profileUpdate.physicalStatus = profileData.physicalStatus;
    if (profileData.maritalStatus !== undefined) profileUpdate.maritalStatus = profileData.maritalStatus;
    
    if (profileData.childrenCount !== undefined) {
      const cc = parseInt(profileData.childrenCount);
      profileUpdate.childrenCount = isNaN(cc) ? 0 : cc;
    }
    if (profileData.childrenLivingWith !== undefined) profileUpdate.childrenLivingWith = profileData.childrenLivingWith === true || profileData.childrenLivingWith === "true";
    
    if (profileData.religionId !== undefined) profileUpdate.religionId = parseId(profileData.religionId);
    if (profileData.casteId !== undefined) profileUpdate.casteId = parseId(profileData.casteId);
    if (profileData.subcasteId !== undefined) profileUpdate.subcasteId = parseId(profileData.subcasteId);
    if (profileData.motherTongueId !== undefined || profileData.motherTongue !== undefined) {
      profileUpdate.motherTongueId = parseId(profileData.motherTongueId || profileData.motherTongue);
    }
    if (profileData.subcaste !== undefined || profileData.subCaste !== undefined) {
      profileUpdate.subcaste = profileData.subcaste || profileData.subCaste || "";
    }
    if (profileData.citizenship !== undefined) {
      profileUpdate.citizenship =
        profileData.citizenship === "" ? null : String(profileData.citizenship);
    }
    if (profileData.complexion !== undefined) profileUpdate.complexion = profileData.complexion;
    if (profileData.shortBio !== undefined || profileData.aboutMe !== undefined) {
      profileUpdate.shortBio = profileData.shortBio || profileData.aboutMe || "";
    }
    if (profileData.convenientTimeToCall !== undefined) profileUpdate.convenientTimeToCall = profileData.convenientTimeToCall;
    if (profileData.linkedInUrl !== undefined) profileUpdate.linkedInUrl = profileData.linkedInUrl;
    if (profileData.instagramUrl !== undefined) profileUpdate.instagramUrl = profileData.instagramUrl;
    if (profileData.facebookUrl !== undefined) profileUpdate.facebookUrl = profileData.facebookUrl;
    
    if (profileData.countryId !== undefined) profileUpdate.countryId = parseId(profileData.countryId);
    if (profileData.stateId !== undefined) profileUpdate.stateId = parseId(profileData.stateId);
    if (profileData.cityId !== undefined) profileUpdate.cityId = parseId(profileData.cityId);
    
    if (profileData.educationId !== undefined || profileData.highestEducation !== undefined) {
      profileUpdate.educationId = parseId(profileData.educationId);
    }
    if (profileData.employmentTypeId !== undefined || profileData.employmentType !== undefined) {
      profileUpdate.employmentTypeId = parseId(profileData.employmentTypeId);
    }
    if (profileData.occupationId !== undefined || profileData.designation !== undefined) {
      profileUpdate.occupationId = parseId(profileData.occupationId);
    }
    if (profileData.incomeRangeId !== undefined || profileData.incomeRange !== undefined) {
      profileUpdate.incomeRangeId = parseId(profileData.incomeRangeId);
    }
    
    if (profileData.familyStatus !== undefined) profileUpdate.familyStatus = profileData.familyStatus;
    if (profileData.profileVisibility !== undefined) profileUpdate.profileVisibility = profileData.profileVisibility;

    const [userProfile] = await UserProfile.upsert(profileUpdate, { transaction });
    const userProfileId = userProfile.id;

    // 3. Upsert FamilyDetails - Partial Update
    const familyUpdate: any = { userProfileId };
    if (profileData.fatherName !== undefined) familyUpdate.fatherName = profileData.fatherName;
    if (profileData.fatherOccupation !== undefined) familyUpdate.fatherOccupation = profileData.fatherOccupation;
    if (profileData.motherName !== undefined) familyUpdate.motherName = profileData.motherName;
    if (profileData.motherOccupation !== undefined) familyUpdate.motherOccupation = profileData.motherOccupation;
    if (profileData.familyType !== undefined) familyUpdate.familyType = profileData.familyType;
    if (profileData.familyStatus !== undefined) familyUpdate.familyStatus = profileData.familyStatus;
    if (profileData.siblingsCount !== undefined) {
      const sc = parseInt(profileData.siblingsCount);
      familyUpdate.siblingsCount = isNaN(sc) ? 0 : sc;
    }
    if (profileData.ownHouse !== undefined) {
      familyUpdate.ownHouse = profileData.ownHouse === true || profileData.ownHouse === "true";
    }
    if (profileData.nativeDistrict !== undefined) familyUpdate.nativeDistrict = profileData.nativeDistrict;

    if (Object.keys(familyUpdate).length > 1) {
      await FamilyDetails.upsert(familyUpdate, { transaction });
    }

    // 4. Upsert HoroscopeDetails - Partial Update
    const horoscopeUpdate: any = { userProfileId };
    if (profileData.starId !== undefined) horoscopeUpdate.starId = parseId(profileData.starId);
    if (profileData.rasiId !== undefined) horoscopeUpdate.rasiId = parseId(profileData.rasiId);
    if (profileData.laknamId !== undefined) horoscopeUpdate.laknamId = parseId(profileData.laknamId);
    if (profileData.gothramId !== undefined) horoscopeUpdate.gothramId = parseId(profileData.gothramId);
    if (profileData.sevvaiDhosham !== undefined) horoscopeUpdate.sevvaiDhosham = profileData.sevvaiDhosham;
    if (profileData.rahuKetuDhosham !== undefined) horoscopeUpdate.rahuKetuDhosham = profileData.rahuKetuDhosham;
    if (profileData.birthTime !== undefined) horoscopeUpdate.birthTime = profileData.birthTime;
    if (profileData.birthPlace !== undefined) horoscopeUpdate.birthPlace = profileData.birthPlace;
    if (profileData.birthCityId !== undefined) horoscopeUpdate.birthCityId = parseId(profileData.birthCityId);
    
    if (Object.keys(horoscopeUpdate).length > 1) {
      await HoroscopeDetails.upsert(horoscopeUpdate, { transaction });
    }

    // 5. Upsert LocationLifestyle - Partial Update
    const lifestyleUpdate: any = { userProfileId };
    if (profileData.relocatePreference !== undefined) lifestyleUpdate.relocatePreference = profileData.relocatePreference;
    if (profileData.diet !== undefined) lifestyleUpdate.diet = profileData.diet;
    if (profileData.drink !== undefined) lifestyleUpdate.drink = profileData.drink;
    if (profileData.smoke !== undefined) lifestyleUpdate.smoke = profileData.smoke;
    if (profileData.fitness !== undefined || profileData.fitnessLevel !== undefined) {
      lifestyleUpdate.fitnessLevel = profileData.fitness || profileData.fitnessLevel;
    }
    
    // personality scales
    if (profileData.ambition !== undefined) {
      // Map back from UI labels if necessary, but here we assume the frontend might send numbers OR we map strings to numbers if that's what the mapper did
      const amb = profileData.ambition;
      if (typeof amb === 'number') lifestyleUpdate.ambition = amb;
      else if (amb === "High") lifestyleUpdate.ambition = 4;
      else if (amb === "Moderate") lifestyleUpdate.ambition = 3;
      else if (amb === "Low") lifestyleUpdate.ambition = 2;
    }
    if (profileData.spirituality !== undefined) {
      const sp = profileData.spirituality;
      if (typeof sp === 'number') lifestyleUpdate.spiritualInclination = sp;
      else if (sp === "Very Spiritual") lifestyleUpdate.spiritualInclination = 4;
      else if (sp === "Moderately Spiritual") lifestyleUpdate.spiritualInclination = 3;
      else if (sp === "Not Spiritual") lifestyleUpdate.spiritualInclination = 2;
    }
    
    if (Object.keys(lifestyleUpdate).length > 1) {
      await LocationLifestyle.upsert(lifestyleUpdate, { transaction });
    }

    // 6. Upsert EducationCareer - Partial Update
    const educationUpdate: any = { userProfileId };
    if (profileData.highestEducation !== undefined) educationUpdate.highestEducation = profileData.highestEducation;
    if (profileData.employmentType !== undefined) educationUpdate.employmentType = profileData.employmentType;
    if (profileData.designation !== undefined) educationUpdate.designation = profileData.designation;
    if (profileData.incomeRange !== undefined) educationUpdate.incomeRange = profileData.incomeRange;
    if (profileData.careerAfterMarriage !== undefined || profileData.careerPlanAfterMarriage !== undefined) {
      educationUpdate.careerPlanAfterMarriage = profileData.careerAfterMarriage || profileData.careerPlanAfterMarriage;
    }

    if (Object.keys(educationUpdate).length > 1) {
      await EducationCareer.upsert(educationUpdate, { transaction });
    }

    // 7. Upsert UserPreference - Partial Update
    const prefUpdate: any = { userId };
    if (profileData.partnerAgeMin !== undefined) prefUpdate.minAge = parseInt(profileData.partnerAgeMin) || 18;
    if (profileData.partnerAgeMax !== undefined) prefUpdate.maxAge = parseInt(profileData.partnerAgeMax) || 40;
    if (profileData.partnerHeightMin !== undefined) prefUpdate.minHeightCm = parseInt(profileData.partnerHeightMin) || null;
    if (profileData.partnerHeightMax !== undefined) prefUpdate.maxHeightCm = parseInt(profileData.partnerHeightMax) || null;
    if (profileData.partnerMaritalStatus !== undefined) prefUpdate.maritalStatus = profileData.partnerMaritalStatus;
    if (profileData.partnerReligion !== undefined) prefUpdate.religionId = parseId(profileData.partnerReligion);
    if (profileData.partnerCastes !== undefined) prefUpdate.partnerCastes = profileData.partnerCastes;
    if (profileData.partnerEducation !== undefined) prefUpdate.educationId = parseId(profileData.partnerEducation);
    if (profileData.partnerCountry !== undefined) prefUpdate.countryId = parseId(profileData.partnerCountry);
    if (profileData.partnerState !== undefined) prefUpdate.stateId = parseId(profileData.partnerState);
    if (profileData.partnerLocationPreference !== undefined) prefUpdate.preferredLocation = profileData.partnerLocationPreference;

    if (Object.keys(prefUpdate).length > 1) {
      await UserPreference.upsert(prefUpdate, { transaction });
    }

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
    console.log("userId", userId);
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
        {
          model: HoroscopeDetails,
          include: [
            { model: Star, as: "Star" },
            { model: Rasi, as: "Rasi" },
            { model: Laknam, as: "Laknam" },
            { model: Gothram, as: "Gothram" },
          ],
        },
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

    // Files are stored under a per-user subdirectory (see uploadMiddleware).
    // Build the URL to match the actual on-disk location so it can be served
    // and later unlinked correctly on deletion.
    const photoUrl = `/uploads/user_${userId}/${file.filename}`;

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

    // Delete physical file from disk if it exists
    if (photo.url) {
      const filePath = path.join(process.cwd(), photo.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

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

    const imageUrl = `/uploads/user_${userId}/${file.filename}`;

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

    // Delete physical file from disk if it exists
    const filePath = path.join(process.cwd(), horoscope.horoscopeImageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

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

    // 0. Check for tier and contact disclosure entitlement
    const { tier } = req.user
      ? await getUserTier(req.user.id)
      : { tier: "Basic Member" };
    let includeContact = false;

    if (req.user && parsedId !== req.user.id) {
      const viewerId = req.user.id;

      // Check if already viewed this specific user
      const alreadyViewed = await PhoneViewLog.findOne({
        where: { viewerId, viewedUserId: parsedId },
      });

      if (alreadyViewed) {
        // Once viewed, it's always accessible to that viewer
        includeContact = true;
      } else {
        if (tier === "Gold") {
          includeContact = true;
          await PhoneViewLog.create({ viewerId, viewedUserId: parsedId });
        } else if (tier === "Silver") {
          const startOfMonth = new Date();
          startOfMonth.setDate(1);
          startOfMonth.setHours(0, 0, 0, 0);

          const viewsThisMonth = await PhoneViewLog.count({
            where: {
              viewerId,
              viewedAt: { [Op.gte]: startOfMonth },
            },
          });

          if (viewsThisMonth < 10) {
            includeContact = true;
            await PhoneViewLog.create({ viewerId, viewedUserId: parsedId });
          }
        }
      }
    }

    const user = await User.findByPk(parsedId, {
      attributes: {
        exclude: includeContact
          ? ["password", "countryCodeId"]
          : ["password", "email", "countryCodeId"],
      }, // Protect PII conditionally (mobile fetched to be masked in serializer)
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
        {
          model: HoroscopeDetails,
          include: [
            { model: Star, as: "Star" },
            { model: Rasi, as: "Rasi" },
            { model: Laknam, as: "Laknam" },
            { model: Gothram, as: "Gothram" },
          ],
        },
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

    const userResponse = user.toJSON() as any;
    userResponse.mobile = maskPhoneNumber(
      userResponse.mobile,
      includeContact,
      false,
    );

    res.status(200).json({
      user: userResponse,
      profile: profileSerializer.toPublicProfile(
        { ...safeProfile, User: user },
        false,
        includeContact,
      ),
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
      subcasteId,
      familyStatus,
      smoking,
      drinking,
      isVerified,
      profileStrength,
      sort,
      // Horoscope filters (Gold only)
      starId,
      rasiId,
      dosham,
    } = req.query;

    const { tier } = await getUserTier(req.user.id);

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

    if (stateId) where.stateId = stateId;
    if (religionId) where.religionId = religionId;
    // Caste is available to all tiers (free users can filter by caste).
    if (casteId) where.casteId = casteId;

    // Advanced Filters (Silver/Gold only)
    if (tier !== "Basic Member") {
      if (cityId) where.cityId = cityId;
      if (maritalStatus) where.maritalStatus = maritalStatus;
      if (educationId) where.educationId = educationId;
      if (occupationId) where.occupationId = occupationId;
      if (motherTongueId) where.motherTongueId = motherTongueId;
      if (incomeRangeId) where.incomeRangeId = incomeRangeId;
      // Sub-caste stays premium-only.
      if (subcasteId) where.subcasteId = subcasteId;

      if (heightMin || heightMax) {
        where.heightCm = {};
        if (heightMin) where.heightCm[Op.gte] = Number(heightMin);
        if (heightMax) where.heightCm[Op.lte] = Number(heightMax);
      }
    }

    // Horoscope Filters (Gold only)
    if (tier === "Gold") {
      const horoscopeWhere: any = {};
      if (starId) horoscopeWhere.starId = starId;
      if (rasiId) horoscopeWhere.rasiId = rasiId;
      if (dosham) {
        if (dosham === "sevvai") horoscopeWhere.sevvaiDhosham = "Yes";
        if (dosham === "rahu") horoscopeWhere.rahuKetuDhosham = "Yes";
      }

      if (Object.keys(horoscopeWhere).length > 0) {
        where["$HoroscopeDetails.id$"] = { [Op.ne]: null }; // Ensure they have horoscope details
        // We'll add HoroscopeDetails to includes below
      }
    }
    if (profileStrength)
      where.profileStrength = { [Op.gte]: Number(profileStrength) };

    const lifestyleWhere: any = {};
    if (tier !== "Basic Member") {
      if (diet) lifestyleWhere.diet = diet;
      if (smoking) lifestyleWhere.smoke = smoking;
      if (drinking) lifestyleWhere.drink = drinking;
    }

    const familyWhere: any = {};
    if (familyStatus) familyWhere.familyStatus = familyStatus;

    const badgeWhere: any = {};
    if (isVerified === "true") badgeWhere.mobileVerified = true;

    let order: any = [["createdAt", "DESC"]];
    if (sort === "recentlyJoined") order = [["createdAt", "DESC"]];
    if (sort === "recentlyActive") order = [["updatedAt", "DESC"]];
    if (sort === "profileScore") order = [["profileStrength", "DESC"]];
    if (sort === "mostCompatible") order = [["matchScore", "DESC"]];

    const includes: any[] = [
      {
        model: User,
        where: userWhere,
        attributes: ["id", "firstName", "lastName", "gender", "mobile"],
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
      Subcaste,
      IncomeRange,
      {
        model: HoroscopeDetails,
        required: tier === "Gold" && (!!starId || !!rasiId || !!dosham),
        where:
          tier === "Gold"
            ? (() => {
                const h: any = {};
                if (starId) h.starId = starId;
                if (rasiId) h.rasiId = rasiId;
                if (dosham === "sevvai") h.sevvaiDhosham = "Yes";
                if (dosham === "rahu") h.rahuKetuDhosham = "Yes";
                return h;
              })()
            : undefined,
      },
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

    // 2. Fetch interests for these profiles to mark 'hasSentInterest'
    const targetUserIds = results.map((p) => p.userId);
    const existingInterests = await Interest.findAll({
      where: {
        senderId: req.user.id,
        receiverId: { [Op.in]: targetUserIds },
        status: { [Op.ne]: "WITHDRAWN" }, // Withdrawn ones can be re-sent, so we don't mark as 'Sent'
      },
      attributes: ["receiverId"],
    });

    const sentInterestSet = new Set(existingInterests.map((i) => i.receiverId));

    const serializedResults = results.map((p) =>
      profileSerializer.toPublicProfile(p, sentInterestSet.has(p.userId)),
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

export const getViewers = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;

    // Gate by Silver+ tier
    const { tier } = await getUserTier(userId);
    if (tier === "Basic Member") {
      res.status(403).json({
        message:
          "Viewing who viewed your profile is a Premium feature. Upgrade to Silver or higher to see!",
        upgradeRequired: "Silver",
      });
      return;
    }

    const views = await ProfileView.findAll({
      where: { viewedId: userId },
      include: [
        {
          model: User,
          as: "Viewer",
          include: [
            { model: UserProfile, include: [Religion, City] },
            { model: UserPhoto, as: "photos", required: false },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 50,
    });

    const formattedViewers = views.map((view: any) => {
      const viewer = view.Viewer;
      return {
        viewedAt: view.createdAt,
        profile: profileSerializer.toPublicProfile({
          ...viewer.UserProfile.toJSON(),
          User: viewer,
        }),
      };
    });

    res.status(200).json({ viewers: formattedViewers });
  } catch (error) {
    console.error("Get viewers error:", error);
    res.status(500).json({ message: "Server error fetching viewers" });
  }
};

const REQUEST_SUBMITTED_MESSAGE =
  "Your caste/subcaste request has been submitted for review. Our team will verify and add it if approved.";

const toId = (id: any): number | null => {
  const parsed = parseInt(id);
  return isNaN(parsed) ? null : parsed;
};

// User submits a new caste that is missing from the master list.
export const requestCaste = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const religionId = toId(req.body.religionId);
    const name = String(req.body.name || "").trim();

    if (!religionId) {
      res.status(400).json({ message: "Religion is required" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "Caste name is required" });
      return;
    }

    // Dedupe against the existing master list (case-insensitive).
    const existingCaste = await Caste.findOne({
      where: { religionId, name: { [Op.iLike]: name } },
    });
    if (existingCaste) {
      res.status(200).json({
        message: "This caste already exists.",
        caste: existingCaste,
        alreadyExists: true,
      });
      return;
    }

    // Dedupe against pending requests for the same religion.
    const existingRequest = await CasteRequest.findOne({
      where: { religionId, name: { [Op.iLike]: name }, status: "Pending" },
    });
    if (existingRequest) {
      res.status(200).json({ message: REQUEST_SUBMITTED_MESSAGE });
      return;
    }

    await CasteRequest.create({ userId: req.user.id, religionId, name });
    res.status(201).json({ message: REQUEST_SUBMITTED_MESSAGE });
  } catch (error) {
    console.error("Request caste error:", error);
    res.status(500).json({ message: "Server error submitting caste request" });
  }
};

// User submits a new subcaste that is missing from the master list.
export const requestSubcaste = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const casteId = toId(req.body.casteId);
    const name = String(req.body.name || "").trim();

    if (!casteId) {
      res.status(400).json({ message: "Caste is required" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "Subcaste name is required" });
      return;
    }

    const existingSubcaste = await Subcaste.findOne({
      where: { casteId, name: { [Op.iLike]: name } },
    });
    if (existingSubcaste) {
      res.status(200).json({
        message: "This subcaste already exists.",
        subcaste: existingSubcaste,
        alreadyExists: true,
      });
      return;
    }

    const existingRequest = await SubcasteRequest.findOne({
      where: { casteId, name: { [Op.iLike]: name }, status: "Pending" },
    });
    if (existingRequest) {
      res.status(200).json({ message: REQUEST_SUBMITTED_MESSAGE });
      return;
    }

    await SubcasteRequest.create({ userId: req.user.id, casteId, name });
    res.status(201).json({ message: REQUEST_SUBMITTED_MESSAGE });
  } catch (error) {
    console.error("Request subcaste error:", error);
    res
      .status(500)
      .json({ message: "Server error submitting subcaste request" });
  }
};
