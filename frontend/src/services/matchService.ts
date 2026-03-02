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

export const DUMMY_MATCHES: MatchProfile[] = [
  {
    userId: "125",
    basicDetails: {
      firstName: "Priya",
      lastName: "Krishnamurthy",
      gender: "Female",
      dob: "1997-06-14",
      religion: "Hindu",
      caste: "Brahmin",
      location: "Chennai, Tamil Nadu",
      nativeDistrict: "Chennai",
      height: "5'3\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "M.Tech (Computer Science)",
      profession: "Software Engineer",
      incomeRange: "₹12 – 18 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 5,
      familyOrientation: 4,
      spiritualInclination: 3,
    },
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: true,
      adminApproved: true,
    },
    matchScore: 95,
  },
  {
    userId: "dummy-2",
    basicDetails: {
      firstName: "Ananya",
      lastName: "Subramanian",
      gender: "Female",
      dob: "1999-03-21",
      religion: "Hindu",
      caste: "Pillai",
      location: "Coimbatore, Tamil Nadu",
      nativeDistrict: "Coimbatore",
      height: "5'5\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "MBBS",
      profession: "Doctor",
      incomeRange: "₹15 – 25 LPA",
      employmentType: "Government",
    },
    personalityTraits: {
      ambition: 4,
      familyOrientation: 5,
      spiritualInclination: 4,
    },
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: false,
      adminApproved: true,
    },
    matchScore: 91,
  },
  {
    userId: "dummy-3",
    basicDetails: {
      firstName: "Kavitha",
      lastName: "Rajan",
      gender: "Female",
      dob: "1996-11-05",
      religion: "Hindu",
      caste: "Mudaliar",
      location: "Madurai, Tamil Nadu",
      nativeDistrict: "Madurai",
      height: "5'4\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "MBA (Finance)",
      profession: "Finance Manager",
      incomeRange: "₹10 – 15 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 4,
      familyOrientation: 4,
      spiritualInclination: 5,
    },
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: true,
      adminApproved: true,
    },
    matchScore: 88,
  },
  {
    userId: "dummy-4",
    basicDetails: {
      firstName: "Meena",
      lastName: "Venkataraman",
      gender: "Female",
      dob: "1998-08-17",
      religion: "Hindu",
      caste: "Nadar",
      location: "Tirunelveli, Tamil Nadu",
      nativeDistrict: "Tirunelveli",
      height: "5'2\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "B.E (Electronics)",
      profession: "Design Engineer",
      incomeRange: "₹8 – 12 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 3,
      familyOrientation: 5,
      spiritualInclination: 4,
    },
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: false,
      adminApproved: false,
    },
    matchScore: 84,
  },
  {
    userId: "dummy-5",
    basicDetails: {
      firstName: "Divya",
      lastName: "Balakrishnan",
      gender: "Female",
      dob: "2000-01-29",
      religion: "Hindu",
      caste: "Chettiar",
      location: "Salem, Tamil Nadu",
      nativeDistrict: "Salem",
      height: "5'4\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "B.Com CA",
      profession: "Chartered Accountant",
      incomeRange: "₹10 – 20 LPA",
      employmentType: "Self-Employed",
    },
    personalityTraits: {
      ambition: 5,
      familyOrientation: 3,
      spiritualInclination: 3,
    },
    photos: [
      "https://images.unsplash.com/photo-1542596594-648d8b4c7ce5?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: true,
      adminApproved: true,
    },
    matchScore: 82,
  },
  {
    userId: "dummy-6",
    basicDetails: {
      firstName: "Lavanya",
      lastName: "Natarajan",
      gender: "Female",
      dob: "1997-04-10",
      religion: "Hindu",
      caste: "Adi Dravidar",
      location: "Trichy, Tamil Nadu",
      nativeDistrict: "Tiruchirappalli",
      height: "5'3\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "MSc (Nutrition)",
      profession: "Nutritionist",
      incomeRange: "₹6 – 10 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 3,
      familyOrientation: 5,
      spiritualInclination: 5,
    },
    photos: [
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: false,
      adminApproved: true,
    },
    matchScore: 79,
  },
  {
    userId: "dummy-7",
    basicDetails: {
      firstName: "Arun",
      lastName: "Chandrasekaran",
      gender: "Male",
      dob: "1995-09-22",
      religion: "Hindu",
      caste: "Brahmin",
      location: "Chennai, Tamil Nadu",
      nativeDistrict: "Chennai",
      height: "5'10\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "B.Tech (IIT Madras)",
      profession: "Product Manager",
      incomeRange: "₹25 – 40 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 5,
      familyOrientation: 4,
      spiritualInclination: 2,
    },
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: true,
      adminApproved: true,
    },
    matchScore: 93,
  },
  {
    userId: "dummy-8",
    basicDetails: {
      firstName: "Karthik",
      lastName: "Sundaresan",
      gender: "Male",
      dob: "1994-12-15",
      religion: "Hindu",
      caste: "Gounder",
      location: "Erode, Tamil Nadu",
      nativeDistrict: "Erode",
      height: "5'11\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "MBA (XLRI)",
      profession: "Business Analyst",
      incomeRange: "₹20 – 30 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 4,
      familyOrientation: 5,
      spiritualInclination: 3,
    },
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: false,
      adminApproved: true,
    },
    matchScore: 87,
  },
  {
    userId: "dummy-9",
    basicDetails: {
      firstName: "Vijay",
      lastName: "Ramasamy",
      gender: "Male",
      dob: "1996-07-04",
      religion: "Hindu",
      caste: "Thevar",
      location: "Madurai, Tamil Nadu",
      nativeDistrict: "Madurai",
      height: "5'9\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "MBBS, MS (Surgery)",
      profession: "Surgeon",
      incomeRange: "₹30 – 50 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 5,
      familyOrientation: 4,
      spiritualInclination: 4,
    },
    photos: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: true,
      adminApproved: true,
    },
    matchScore: 90,
  },
  {
    userId: "dummy-10",
    basicDetails: {
      firstName: "Siva",
      lastName: "Murugesan",
      gender: "Male",
      dob: "1993-02-18",
      religion: "Hindu",
      caste: "Vellalar",
      location: "Coimbatore, Tamil Nadu",
      nativeDistrict: "Coimbatore",
      height: "6'0\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "B.Arch",
      profession: "Architect",
      incomeRange: "₹15 – 22 LPA",
      employmentType: "Self-Employed",
    },
    personalityTraits: {
      ambition: 4,
      familyOrientation: 3,
      spiritualInclination: 3,
    },
    photos: [
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: false,
      adminApproved: false,
    },
    matchScore: 75,
  },
  {
    userId: "dummy-11",
    basicDetails: {
      firstName: "Deepak",
      lastName: "Jayaraman",
      gender: "Male",
      dob: "1995-05-30",
      religion: "Hindu",
      caste: "Mudaliar",
      location: "Vellore, Tamil Nadu",
      nativeDistrict: "Vellore",
      height: "5'8\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "M.E (Civil)",
      profession: "Civil Engineer",
      incomeRange: "₹8 – 14 LPA",
      employmentType: "Government",
    },
    personalityTraits: {
      ambition: 3,
      familyOrientation: 5,
      spiritualInclination: 5,
    },
    photos: [
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: true,
      adminApproved: true,
    },
    matchScore: 80,
  },
  {
    userId: "dummy-12",
    basicDetails: {
      firstName: "Surya",
      lastName: "Annamalai",
      gender: "Male",
      dob: "1997-10-11",
      religion: "Hindu",
      caste: "Asari",
      location: "Tanjore, Tamil Nadu",
      nativeDistrict: "Thanjavur",
      height: "5'9\"",
      maritalStatus: "Never Married",
      motherTongue: "Tamil",
    },
    professionalInfo: {
      education: "B.Tech (NIT Trichy)",
      profession: "Data Scientist",
      incomeRange: "₹18 – 28 LPA",
      employmentType: "Private Sector",
    },
    personalityTraits: {
      ambition: 5,
      familyOrientation: 4,
      spiritualInclination: 2,
    },
    photos: [
      "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?q=80&w=800&auto=format&fit=crop",
    ],
    badge: {
      mobileVerified: true,
      horoscopeAvailable: false,
      adminApproved: true,
    },
    matchScore: 85,
  },
];

export const matchService = {
  getDailyMatches: async (): Promise<MatchProfile[]> => {
    try {
      const response = await apiClient.get("/matches/daily");
      const data: MatchProfile[] = response.data;
      // If backend returns meaningful results, use them; otherwise use dummies
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return DUMMY_MATCHES;
    } catch {
      // Network error or backend unavailable — always show dummy matches
      return DUMMY_MATCHES;
    }
  },
};
