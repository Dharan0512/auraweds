/**
 * Maps nested backend profile data into a flat structure for the wizard form.
 */
export const mapProfileToFormData = (profile: any) => {
  if (!profile) return {};

  return {
    // Basic Info (User Model)
    createdFor: profile.user?.createdFor || "Myself",
    gender: profile.user?.gender || "Male",
    firstName: profile.user?.firstName || "",
    lastName: profile.user?.lastName || "",
    mobile: profile.user?.mobile || "",
    convenientTimeToCall: profile.profile?.convenientTimeToCall || "Anytime",
    linkedInUrl: profile.profile?.linkedInUrl || "",
    instagramUrl: profile.profile?.instagramUrl || "",
    facebookUrl: profile.profile?.facebookUrl || "",

    // Personal Details (Profile Model)
    dob: profile.profile?.dob
      ? new Date(profile.profile.dob).toISOString().split("T")[0]
      : "",
    // Register form uses "heightCm"
    heightCm: profile.profile?.heightCm?.toString() || "",
    height: profile.profile?.heightCm?.toString() || "",
    maritalStatus: profile.profile?.maritalStatus || "Never Married",
    childrenCount: profile.profile?.childrenCount?.toString() || "0",
    childrenLivingWith: profile.profile?.childrenLivingWith || false,
    physicalStatus: profile.profile?.physicalStatus || "Normal",
    shortBio: profile.profile?.shortBio || profile.profile?.aboutMe || "",
    aboutMe: profile.profile?.shortBio || profile.profile?.aboutMe || "",
    complexion: profile.profile?.complexion || "",

    // DOB parts for register form
    dobDay: profile.profile?.dob
      ? String(new Date(profile.profile.dob).getDate())
      : "",
    dobMonth: profile.profile?.dob
      ? String(new Date(profile.profile.dob).getMonth() + 1)
      : "",
    dobYear: profile.profile?.dob
      ? String(new Date(profile.profile.dob).getFullYear())
      : "",

    // Religion/Community
    religionId: profile.profile?.religionId?.toString() || "",
    casteId: profile.profile?.casteId?.toString() || "",
    subcaste: profile.profile?.subcaste || "",
    subCaste: profile.profile?.subcaste || "",
    // Register form uses "motherTongueId"
    motherTongueId: profile.profile?.motherTongueId?.toString() || "",
    motherTongue: profile.profile?.motherTongueId?.toString() || "",

    // Horoscope
    showHoroscope: profile.profile?.HoroscopeDetail?.showHoroscope ?? true,
    star: profile.profile?.HoroscopeDetail?.star || "",
    starId: profile.profile?.HoroscopeDetail?.starId?.toString() || "",
    rasi: profile.profile?.HoroscopeDetail?.rasi || "",
    rasiId: profile.profile?.HoroscopeDetail?.rasiId?.toString() || "",
    laknam: profile.profile?.HoroscopeDetail?.laknam || "",
    laknamId: profile.profile?.HoroscopeDetail?.laknamId?.toString() || "",
    gothram: profile.profile?.HoroscopeDetail?.gothram || "",
    gothramId: profile.profile?.HoroscopeDetail?.gothramId?.toString() || "",
    sevvaiDhosham: profile.profile?.HoroscopeDetail?.sevvaiDhosham || "No",
    rahuKetuDhosham: profile.profile?.HoroscopeDetail?.rahuKetuDhosham || "No",
    birthTime: profile.profile?.HoroscopeDetail?.birthTime || "",
    birthPlace: profile.profile?.HoroscopeDetail?.birthPlace || "",
    birthCityId:
      profile.profile?.HoroscopeDetail?.birthCityId?.toString() || "",
    horoscopeImageUrl:
      profile.profile?.HoroscopeDetail?.horoscopeImageUrl || "",
    horoscopeImage: profile.profile?.HoroscopeDetail?.horoscopeImageUrl || "",

    // Family Details
    fatherName: profile.profile?.FamilyDetail?.fatherName || "",
    fatherOccupation: profile.profile?.FamilyDetail?.fatherOccupation || "",
    motherName: profile.profile?.FamilyDetail?.motherName || "",
    motherOccupation: profile.profile?.FamilyDetail?.motherOccupation || "",
    familyType: profile.profile?.FamilyDetail?.familyType || "Nuclear",
    familyStatus: profile.profile?.FamilyDetail?.familyStatus || "Middle Class",
    siblingsCount:
      profile.profile?.FamilyDetail?.siblingsCount?.toString() || "0",
    ownHouse: profile.profile?.FamilyDetail?.ownHouse ?? false,
    nativeDistrict: profile.profile?.FamilyDetail?.nativeDistrict || "",

    // Education/Career — register form uses name-based fields
    educationId: profile.profile?.educationId?.toString() || "",
    // Register form "highestEducation" stores the education name string
    highestEducation:
      profile.profile?.Education?.name ||
      profile.profile?.educationDetail ||
      "",
    educationDetail: profile.profile?.educationDetail || "",
    employmentTypeId: profile.profile?.employmentTypeId?.toString() || "",
    // Register form "employmentType" stores the type name string
    employmentType:
      profile.profile?.EmploymentType?.name ||
      profile.profile?.employmentType ||
      "",
    occupationId: profile.profile?.occupationId?.toString() || "",
    incomeRangeId: profile.profile?.incomeRangeId?.toString() || "",
    incomeRange: profile.profile?.IncomeRange?.name || "",
    designation: profile.profile?.designation || "",
    companyName: profile.profile?.companyName || "",

    // Location
    countryId: profile.profile?.countryId?.toString() || "",
    stateId: profile.profile?.stateId?.toString() || "",
    cityId: profile.profile?.cityId?.toString() || "",
    country: profile.profile?.country || "India",
    state: profile.profile?.state || "",
    city: profile.profile?.city || "",
    citizenship: profile.profile?.countryId?.toString() || "",
    relocatePreference: profile.profile?.relocatePreference || "Flexible",

    // Lifestyle
    diet: profile.profile?.diet || "Veg",
    spirituality: profile.profile?.spirituality || "Not Spiritual",
    drink: profile.profile?.drink || "No",
    smoke: profile.profile?.smoke || "No",
    fitnessLevel:
      profile.profile?.fitnessLevel || profile.profile?.fitness || "Occasional",
    fitness: profile.profile?.fitness || "Occasional",
    ambition: profile.profile?.ambition || 3,
    familyOrientation: profile.profile?.familyOrientation || 3,
    emotionalStability: profile.profile?.emotionalStability || 3,
    communicationStyle: profile.profile?.communicationStyle || 3,
    spiritualInclination: profile.profile?.spiritualInclination || 3,
    careerPlanAfterMarriage: profile.profile?.careerPlanAfterMarriage || "",
    languages: profile.profile?.languages || [],
    hobbies: profile.profile?.hobbies || [],
    profileVisibility: profile.profile?.profileVisibility || "Members Only",

    // Preferences
    partnerAgeMin: profile.preferences?.minAge || 22,
    partnerAgeMax: profile.preferences?.maxAge || 30,
    partnerHeightMin: profile.preferences?.minHeightCm || 150,
    partnerHeightMax: profile.preferences?.maxHeightCm || 190,
    partnerMaritalStatus: profile.preferences?.maritalStatus || "Never Married",
    partnerReligion: profile.preferences?.religionId?.toString() || "",
    partnerCaste: profile.preferences?.casteId?.toString() || "",
    partnerCastes: profile.preferences?.partnerCastes || [],
    partnerEducation: profile.preferences?.educationId?.toString() || "",
    partnerCountry: profile.preferences?.countryId?.toString() || "",
    partnerState: profile.preferences?.stateId?.toString() || "",
    partnerLocationPreference: profile.preferences?.preferredLocation || "",
    preferredLocation: profile.preferences?.preferredLocation || "",
    preferredEducation: profile.preferences?.preferredEducation || "",
    preferredIncomeRange: profile.preferences?.preferredIncomeRange || "",
  };
};

/**
 * Compares current form data with initial data and returns only modified fields.
 * This reduces payload size for PATCH requests.
 */
export const getFormDataDiff = (initialData: any, currentData: any) => {
  const diff: any = {};

  Object.keys(currentData).forEach((key) => {
    // Array comparison
    if (Array.isArray(currentData[key])) {
      if (
        JSON.stringify(currentData[key]) !== JSON.stringify(initialData[key])
      ) {
        diff[key] = currentData[key];
      }
    }
    // Deep comparison for primitives and simple values
    else if (currentData[key] !== initialData[key]) {
      diff[key] = currentData[key];
    }
  });

  return diff;
};
