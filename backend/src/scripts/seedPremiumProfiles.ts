import {
  sequelize,
  User,
  UserProfile,
  FamilyDetails,
  HoroscopeDetails,
  LocationLifestyle,
  EducationCareer,
  Badge,
  UserPreference,
  Religion,
  Caste,
  MotherTongue,
} from "../models/sequelize";
import bcrypt from "bcryptjs";

const TN_DISTRICTS = [
  "Chennai",
  "Madurai",
  "Coimbatore",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Thoothukudi",
  "Thanjavur",
  "Dindigul",
  "Karur",
  "Tiruppur",
  "Kancheepuram",
  "Tiruvallur",
  "Cuddalore",
  "Nagapattinam",
  "Namakkal",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Sivaganga",
  "Theni",
  "Thiruvannamalai",
  "Thiruvarur",
  "Virudhunagar",
  "Ariyalur",
  "Krishnagiri",
  "Tirupathur",
  "Ranipet",
  "Tenkasi",
  "Chengalpattu",
  "Mayiladuthurai",
];

const MALE_NAMES = [
  "Arun",
  "Karthik",
  "Senthil",
  "Vignesh",
  "Vijay",
  "Suresh",
  "Ramesh",
  "Dinesh",
  "Kavin",
  "Prabhu",
  "Deepak",
  "Manoj",
  "Rajesh",
  "Surya",
  "Ganesh",
  "Vishnu",
  "Hari",
  "Ram",
  "Siva",
  "Bala",
];
const FEMALE_NAMES = [
  "Priya",
  "Deepika",
  "Divya",
  "Ananya",
  "Sandhya",
  "Kavya",
  "Abirami",
  "Gayathri",
  "Bhavani",
  "Meenakshi",
  "Sneha",
  "Swetha",
  "Priyanka",
  "Yamuna",
  "Nandhini",
  "Janani",
  "Ramya",
  "Iswarya",
  "Sindhu",
  "Keerthi",
];
const SURNAMES = [
  "Kumar",
  "Rajan",
  "Sivam",
  "Pandi",
  "Muthu",
  "Vel",
  "Dharani",
  "Balaji",
  "Nair",
  "Iyer",
  "Iyengar",
  "Chettiar",
  "Gounder",
  "Thevar",
  "Nadhaar",
  "Pillai",
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected. Starting seed...");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Password123", salt);

    // Fetch some master data
    const religion =
      (await Religion.findOne({ where: { name: "Hindu" } })) ||
      (await Religion.create({ name: "Hindu" }));
    const motherTongue =
      (await MotherTongue.findOne({ where: { name: "Tamil" } })) ||
      (await MotherTongue.create({ name: "Tamil" }));
    const caste =
      (await Caste.findOne({
        where: { name: "Other", religionId: religion.id },
      })) || (await Caste.create({ name: "Other", religionId: religion.id }));

    for (let i = 1; i <= 100; i++) {
      const gender = i % 2 === 0 ? "Female" : "Male";
      const name =
        gender === "Male"
          ? MALE_NAMES[i % MALE_NAMES.length]
          : FEMALE_NAMES[i % FEMALE_NAMES.length];
      const surname = SURNAMES[i % SURNAMES.length];
      const timestamp = Date.now();
      const email = `${name.toLowerCase()}.${surname.toLowerCase()}.${i}.${timestamp}@example.com`;
      const district = TN_DISTRICTS[i % TN_DISTRICTS.length];

      const user = await User.create({
        email,
        passwordHash,
        firstName: name,
        lastName: surname,
        gender,
        mobile: `9840${i.toString().padStart(6, "0")}`,
        createdFor: "Self",
        role: "user",
      });

      const profile = await UserProfile.create({
        userId: user.id,
        dob: new Date(1990 + (i % 10), i % 12, (i % 28) + 1),
        heightCm: 150 + (i % 40),
        maritalStatus: "Never Married",
        physicalStatus: "Normal",
        religionId: religion.id,
        motherTongueId: motherTongue.id,
        casteId: caste.id,
        subcaste: "Subcaste " + (i % 5),
        complexion: i % 3 === 0 ? "Fair" : "Wheatish",
        profileStrength: 80 + (i % 20),
        shortBio: `Hi, I am ${name}. I am looking for a suitable partner who values family and career.`,
      });

      await FamilyDetails.create({
        userProfileId: profile.id,
        fatherName: `${surname} Senior`,
        fatherOccupation: "Retired",
        motherName: `Mrs. ${surname}`,
        motherOccupation: "Homemaker",
        familyType: i % 3 === 0 ? "Joint" : "Nuclear",
        familyStatus: "Middle Class",
        siblingsCount: i % 3,
        ownHouse: true,
        nativeDistrict: district,
        familyLocation: district,
      });

      await HoroscopeDetails.create({
        userProfileId: profile.id,
        star: "Ashwini",
        rasi: "Mesham",
        laknam: "Mesham",
        sevvaiDhosham: "No",
        rahuKetuDhosham: "No",
        birthTime: "10:00 AM",
        birthPlace: district,
      });

      await LocationLifestyle.create({
        userProfileId: profile.id,
        country: "India",
        state: "Tamil Nadu",
        city: district,
        relocatePreference: "Flexible",
        diet: i % 4 === 0 ? "Non-veg" : "Veg",
        drink: "No",
        smoke: "No",
        fitnessLevel: "Regular",
        ambition: 4,
        familyOrientation: 5,
        emotionalStability: 4,
        communicationStyle: 4,
        spiritualInclination: 3,
        hobbies: ["Reading", "Travel", "Music"],
      });

      await EducationCareer.create({
        userProfileId: profile.id,
        highestEducation: i % 2 === 0 ? "B.E / B.Tech" : "MBA",
        fieldOfStudy: i % 2 === 0 ? "Computer Science" : "Finance",
        college: "Anna University",
        employmentType: "Private",
        companyName: "Tech Corp",
        designation: "Software Engineer",
        incomeRange: "10L - 15L",
        exactIncome: 1200000,
      });

      await Badge.create({
        userProfileId: profile.id,
        mobileVerified: true,
        emailVerified: true,
        idVerified: i % 5 === 0,
        adminApproved: true,
        premiumMember: i % 10 === 0,
        horoscopeAvailable: true,
      });

      await UserPreference.create({
        userId: user.id,
        minAge: 21,
        maxAge: 35,
        minHeightCm: 150,
        maxHeightCm: 190,
        maritalStatus: "Never Married",
        religionId: religion.id,
        preferredLocation: "Tamil Nadu",
        preferredEducation: "Any Graduate",
      });

      if (i % 10 === 0) console.log(`Seeded ${i} profiles...`);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
