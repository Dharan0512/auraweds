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
    dob: profile.profile?.dob || "",
    height: profile.profile?.heightCm?.toString() || "170",
    maritalStatus: profile.profile?.maritalStatus || "Never Married",
    childrenCount: profile.profile?.childrenCount?.toString() || "0",
    childrenLivingWith: profile.profile?.childrenLivingWith || false,
    physicalStatus: profile.profile?.physicalStatus || "Normal",

    // Religion/Community
    religionId: profile.profile?.religionId?.toString() || "",
    casteId: profile.profile?.casteId?.toString() || "",
    subCaste: profile.profile?.subcaste || "",
    motherTongue: profile.profile?.motherTongueId?.toString() || "",

    // Horoscope
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

    // Education/Career
    educationId: profile.profile?.educationId?.toString() || "",
    educationDetail: profile.profile?.educationDetail || "",
    employmentTypeId: profile.profile?.employmentTypeId?.toString() || "1",
    occupationId: profile.profile?.occupationId?.toString() || "",
    incomeRangeId: profile.profile?.incomeRangeId?.toString() || "",

    // Location
    countryId: profile.profile?.countryId?.toString() || "",
    stateId: profile.profile?.stateId?.toString() || "",
    cityId: profile.profile?.cityId?.toString() || "",
    citizenship: profile.profile?.countryId?.toString() || "",

    // Lifestyle
    diet: profile.profile?.diet || "Veg",
    spirituality: profile.profile?.spirituality || "Not Spiritual",
    drink: profile.profile?.drink || "No",
    smoke: profile.profile?.smoke || "No",
    ambition: profile.profile?.ambition || "Moderate",
    careerAfterMarriage: profile.profile?.careerAfterMarriage || "Yes",
    relocation: profile.profile?.relocation || "No",
    fitness: profile.profile?.fitness || "Regular",
    familyStatus: profile.profile?.familyStatus || "Middle Class",
    aboutMe: profile.profile?.aboutMe || "",

    // Family Details
    fatherName: profile.profile?.FamilyDetail?.fatherName || "",
    fatherOccupation: profile.profile?.FamilyDetail?.fatherOccupation || "",
    motherName: profile.profile?.FamilyDetail?.motherName || "",
    motherOccupation: profile.profile?.FamilyDetail?.motherOccupation || "",
    familyType: profile.profile?.FamilyDetail?.familyType || "Nuclear",
    siblingsCount:
      profile.profile?.FamilyDetail?.siblingsCount?.toString() || "0",
    ownHouse: profile.profile?.FamilyDetail?.ownHouse ?? false,
    nativeDistrict: profile.profile?.FamilyDetail?.nativeDistrict || "",

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
