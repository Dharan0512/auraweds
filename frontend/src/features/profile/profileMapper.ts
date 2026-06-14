/**
 * Maps nested backend profile data into a flat structure for the wizard form.
 */
/**
 * profileMapper.ts
 *
 * Maps the raw backend profile object → flat form data used by EditProfileForm steps.
 * Field names here MUST match what each Step component's useForm schema expects.
 */
/*
{
    "user": {
        "id": 128,
        "createdFor": "Self",
        "gender": "Male",
        "firstName": "Arun", 
        "lastName": "Kumar",
        "mobile": "09940238132",
        "email": "arun@gmail.com",
        "role": "user",
        "isActive": true,
        "lastLoginAt": "2026-04-05T06:47:56.262Z"
    },
    "profile": {
        "id": 131,
        "userId": 128,
        "dob": "1990-08-14",
        "heightCm": 162,
        "physicalStatus": "Normal",
        "maritalStatus": "Never Married",
        "childrenCount": 0,
        "childrenLivingWith": false,
        "religionId": 1,
        "casteId": 1,
        "subcaste": "karava naidu",
        "shortBio": "Already part of AuraWeds...",
        "convenientTimeToCall": "Anytime",
        "countryId": 1,
        "stateId": 1,
        "cityId": 1,
        "familyStatus": "Middle Class",
        "profileVisibility": "Members Only",
        "approvalStatus": "approved",
        "profileStrength": 15,
        "privacySettings": {
            "showValues": true,
            "showHoroscope": true,
            "showAstroMatch": true,
            "showExactIncome": false,
            "showSocialLinks": true,
            "showBirthDetails": true,
            "showFamilyDetails": true
        },
        "Religion": { "id": 1, "name": "Hindu" },
        "Caste": { "id": 1, "name": "Naidu" },
        "FamilyDetail": {
            "familyStatus": "Middle Class",
            "siblingsCount": 1,
            "ownHouse": true
        },
        "LocationLifestyle": {
            "diet": "Veg",
            "relocatePreference": "Flexible"
        }
    },
    "preferences": {
        "minAge": 18,
        "maxAge": 40,
        "Religion": { "id": 1, "name": "Hindu" }
    },
    "photos": []
}
*/
export function mapProfileToFormData(profile: any): Record<string, any> {
  console.log("Mapping profile to form data:", profile);
  if (!profile) return {};

  const user = profile.user || {};
  const profileData = profile.profile || {};
  const preferences = profile.preferences || {};
  // Sequelize returns these associations under their plural model names
  // (FamilyDetails / HoroscopeDetails). Keep the singular fallback for any
  // legacy/serialized responses that still use it.
  const family = profileData.FamilyDetails || profileData.FamilyDetail || {};
  const horoscope =
    profileData.HoroscopeDetails || profileData.HoroscopeDetail || {};
  const location = profileData.LocationLifestyle || {};
  const education = profileData.EducationCareer || {};

  return {
    // ── Step 1: Basic Identity (Identity Tab) ───────────────────────────────
    createdFor: user.createdFor,
    gender: user.gender ?? "Male",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    mobile: user.mobile ?? "",
    convenientTimeToCall: profileData.convenientTimeToCall ?? "Anytime",
    linkedInUrl: profileData.linkedInUrl ?? "",
    instagramUrl: profileData.instagramUrl ?? "",
    facebookUrl: profileData.facebookUrl ?? "",

    // ── Step 2: Personal Details (Personal Tab) ─────────────────────────────
    dob: profileData.dob ?? "",
    height: profileData.heightCm != null ? String(profileData.heightCm) : "",
    physicalStatus: profileData.physicalStatus ?? "Normal",
    maritalStatus: profileData.maritalStatus ?? "Never Married",
    // The dropdown collapses "3 or more" into the option id "3+", but the
    // backend stores it as the integer 3. Map any count >= 3 back to "3+".
    childrenCount:
      profileData.childrenCount != null
        ? profileData.childrenCount >= 3
          ? "3+"
          : String(profileData.childrenCount)
        : "0",
    childrenLivingWith: profileData.childrenLivingWith ?? false,

    // ── Step 3: Religion & Heritage (Spiritual Tab) ────────────────────────
    religionId:
      profileData.religionId != null ? String(profileData.religionId) : "",
    casteId: profileData.casteId != null ? String(profileData.casteId) : "",
    subcasteId:
      profileData.subcasteId != null ? String(profileData.subcasteId) : "",
    subCaste: profileData.subcaste ?? "",
    motherTongue:
      profileData.motherTongueId != null
        ? String(profileData.motherTongueId)
        : "",

    // Family Details
    fatherName: family.fatherName ?? "",
    fatherOccupation: family.fatherOccupation ?? "",
    motherName: family.motherName ?? "",
    motherOccupation: family.motherOccupation ?? "",
    familyType: family.familyType ?? "Nuclear",
    siblingsCount:
      family.siblingsCount != null ? String(family.siblingsCount) : "0",
    ownHouse: family.ownHouse ?? false,
    nativeDistrict: family.nativeDistrict ?? "",

    // Horoscope Details
    showHoroscope:
      profileData.privacySettings?.showHoroscope ??
      horoscope.showHoroscope ??
      true,
    starId: horoscope.starId != null ? String(horoscope.starId) : "",
    rasiId: horoscope.rasiId != null ? String(horoscope.rasiId) : "",
    laknamId: horoscope.laknamId != null ? String(horoscope.laknamId) : "",
    gothramId: horoscope.gothramId != null ? String(horoscope.gothramId) : "",
    sevvaiDhosham: horoscope.sevvaiDhosham ?? "No",
    rahuKetuDhosham: horoscope.rahuKetuDhosham ?? "No",
    birthTime: horoscope.birthTime ?? "",
    birthPlace: horoscope.birthPlace ?? "",
    birthCityId:
      horoscope.birthCityId != null ? String(horoscope.birthCityId) : "",
    horoscopeImageUrl:
      horoscope.horoscopeImageUrl ?? horoscope.horoscopeImage ?? "",

    // ── Step 4: Education & Ambition (Ambition Tab) ────────────────────────
    highestEducation: education.highestEducation ?? "",
    employmentType: education.employmentType ?? "",
    designation: education.designation ?? "",
    incomeRange: education.incomeRange ?? "",

    // ── Step 5: Location (Location Tab) ─────────────────────────────────────
    // Note: root profileId might be null in some backend responses, so we check location object too
    countryId:
      profileData.countryId != null ? String(profileData.countryId) : "",
    stateId: profileData.stateId != null ? String(profileData.stateId) : "",
    cityId: profileData.cityId != null ? String(profileData.cityId) : "",
    citizenship:
      profileData.citizenship != null
        ? String(profileData.citizenship)
        : location.citizenship != null
          ? String(location.citizenship)
          : "",

    // ── Step 6: Partner Preferences (Partner Pref Tab) ──────────────────────
    // These MUST be Numbers as per Step6Preferences.tsx schema
    partnerAgeMin: preferences.minAge != null ? Number(preferences.minAge) : 22,
    partnerAgeMax: preferences.maxAge != null ? Number(preferences.maxAge) : 35,
    partnerHeightMin:
      preferences.minHeightCm != null ? Number(preferences.minHeightCm) : 150,
    partnerHeightMax:
      preferences.maxHeightCm != null ? Number(preferences.maxHeightCm) : 190,
    partnerMaritalStatus: preferences.maritalStatus ?? "Never Married",
    partnerReligion:
      preferences.religionId != null ? String(preferences.religionId) : "",
    partnerCastes: Array.isArray(preferences.partnerCastes)
      ? preferences.partnerCastes.map(String)
      : [],
    partnerEducation:
      preferences.educationId != null ? String(preferences.educationId) : "",
    partnerCountry:
      preferences.countryId != null ? String(preferences.countryId) : "",
    partnerState:
      preferences.stateId != null ? String(preferences.stateId) : "",
    partnerLocationPreference: preferences.preferredLocation ?? "",

    // ── Step 7: Lifestyle (Lifestyle Tab) ───────────────────────────────────
    diet: location.diet || "Veg",
    drink: location.drink || "No",
    smoke: location.smoke || "No",
    fitness: location.fitnessLevel || "Occasional",
    relocation: location.relocatePreference || "Flexible",
    careerAfterMarriage: education.careerPlanAfterMarriage || "Flexible",
    
    // Convert numeric scales (1-5) from backend to UI labels
    spirituality: (() => {
      const val = Number(location.spiritualInclination);
      if (val >= 4) return "Very Spiritual";
      if (val === 3) return "Moderately Spiritual";
      return "Not Spiritual";
    })(),
    ambition: (() => {
      const val = Number(location.ambition);
      if (val >= 4) return "High";
      if (val === 3) return "Moderate";
      return "Low";
    })(),
    
    familyStatus: family.familyStatus || profileData.familyStatus || "Middle Class",
    aboutMe: profileData.shortBio || "",

    // Form visibility
    profileVisibility: profileData.profileVisibility ?? "Public",
  };
}

/**
 * Returns only the fields that changed between initialData and currentData.
 * Skips undefined values and shallow-equal arrays.
 */
export function getFormDataDiff(
  initialData: Record<string, any>,
  currentData: Record<string, any>,
): Record<string, any> {
  const diff: Record<string, any> = {};

  for (const key of Object.keys(currentData)) {
    const initial = initialData[key];
    const current = currentData[key];

    if (current === undefined) continue;

    if (Array.isArray(current)) {
      if (
        !Array.isArray(initial) ||
        initial.length !== current.length ||
        current.some((v, i) => String(v) !== String(initial[i]))
      ) {
        diff[key] = current;
      }
      continue;
    }

    // Loose comparison handles "150" vs 150 etc.
    if (String(initial) !== String(current)) {
      diff[key] = current;
    }
  }

  return diff;
}
