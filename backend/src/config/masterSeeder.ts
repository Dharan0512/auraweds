import {
  Country,
  MotherTongue,
  Height,
  Religion,
  Caste,
  Plan,
  Star,
  Gothram,
  Laknam,
  Rasi,
} from "../models/sequelize";

const seedCountries = [
  { name: "India", isoCode: "IN", phoneCode: "+91", isActive: true },
  { name: "United States", isoCode: "US", phoneCode: "+1", isActive: true },
  { name: "United Kingdom", isoCode: "GB", phoneCode: "+44", isActive: true },
  { name: "Australia", isoCode: "AU", phoneCode: "+61", isActive: true },
  { name: "Canada", isoCode: "CA", phoneCode: "+1", isActive: true },
  {
    name: "United Arab Emirates",
    isoCode: "AE",
    phoneCode: "+971",
    isActive: true,
  },
];

const seedMotherTongues = [
  { name: "English", isActive: true },
  { name: "Hindi", isActive: true },
  { name: "Tamil", isActive: true },
  { name: "Telugu", isActive: true },
  { name: "Marathi", isActive: true },
  { name: "Gujarati", isActive: true },
  { name: "Bengali", isActive: true },
  { name: "Urdu", isActive: true },
  { name: "Malayalam", isActive: true },
  { name: "Kannada", isActive: true },
  { name: "Odia", isActive: true },
  { name: "Punjabi", isActive: true },
];

const seedReligions = [
  { name: "Hindu", isActive: true },
  { name: "Muslim", isActive: true },
  { name: "Christian", isActive: true },
  { name: "Sikh", isActive: true },
  { name: "Jain", isActive: true },
  { name: "Buddhist", isActive: true },
];

const seedCastesByReligion = {
  Hindu: [
    "Brahmin",
    "Kshatriya",
    "Vaisya",
    "Shudra",
    "Yadav",
    "Rajput",
    "Agarwal",
  ],
  Muslim: ["Sunni", "Shia", "Pathan", "Syed"],
  Christian: ["Catholic", "Protestant", "Orthodox"],
  Sikh: ["Jat", "Khatri", "Arora", "Ramgarhia"],
};

const generateHeights = () => {
  const heights = [];
  for (let cm = 135; cm <= 215; cm++) {
    const inchesTotal = cm / 2.54;
    const feet = Math.floor(inchesTotal / 12);
    const inches = Math.round(inchesTotal % 12);
    heights.push({
      cmValue: cm,
      displayLabel: `${feet}'${inches}" (${cm}cm)`,
    });
  }
  return heights;
};

export const seedMasterData = async () => {
  try {
    // Check and seed Countries
    const countryCount = await Country.count();
    if (countryCount === 0) {
      console.log("Seeding initial Countries...");
      await Country.bulkCreate(seedCountries);
      console.log("Countries seeded successfully.");
    }

    // Check and seed Mother Tongues
    const mtCount = await MotherTongue.count();
    if (mtCount === 0) {
      console.log("Seeding initial Mother Tongues...");
      await MotherTongue.bulkCreate(seedMotherTongues);
      console.log("Mother Tongues seeded successfully.");
    }

    // Check and seed Heights
    const heightCount = await Height.count();
    if (heightCount === 0) {
      console.log("Seeding Heights...");
      await Height.bulkCreate(generateHeights());
      console.log("Heights seeded.");
    }

    // Check and seed Religions and Castes
    const religionCount = await Religion.count();
    if (religionCount === 0) {
      console.log("Seeding Religions and Castes...");
      const religions = await Religion.bulkCreate(seedReligions, {
        returning: true,
      });

      const casteList = [];
      for (const rel of religions) {
        const casteNames =
          seedCastesByReligion[rel.name as keyof typeof seedCastesByReligion] ||
          [];
        for (const cName of casteNames) {
          casteList.push({ name: cName, religionId: rel.id, isActive: true });
        }
      }

      if (casteList.length > 0) {
        await Caste.bulkCreate(casteList);
      }
      console.log("Religions & Castes seeded.");
    }

    // Check and seed Plans
    console.log("Syncing subscription plans...");
    const PREMIUM_PLANS = [
      { id: 1, name: "Silver", monthlyPrice: 3499, isActive: true },
      { id: 2, name: "Silver", monthlyPrice: 5000, isActive: true }, // Early Bird 6M
      { id: 3, name: "Silver", monthlyPrice: 9999, isActive: true },
      { id: 4, name: "Gold", monthlyPrice: 8000, isActive: true },
      { id: 5, name: "Gold", monthlyPrice: 14000, isActive: true },
      { id: 6, name: "Gold", monthlyPrice: 24000, isActive: true },
      { id: 10, name: "Elite Gold", monthlyPrice: 50000, isActive: true },
      { id: 11, name: "Elite Gold", monthlyPrice: 90000, isActive: true },
      { id: 12, name: "Elite Gold", monthlyPrice: 150000, isActive: true },
    ];

    for (const planData of PREMIUM_PLANS) {
      await Plan.upsert(planData);
    }
    console.log("Plans synchronized successfully.");

    // Seed Horoscope Master Data
    console.log("Seeding Horoscope Master Data...");

    const gothrams = [
      "Shiva",
      "Kashyapa",
      "Bharadwaja",
      "Vasishta",
      "Agasthya",
      "Atri",
      "Gautama",
      "Koundinya",
      "Vishwamitra",
      "Haritha",
      "Angirasa",
      "Other",
    ];
    for (const name of gothrams) {
      await Gothram.upsert({ name, isActive: true });
    }

    const laknams = [
      "Mesham",
      "Rishabam",
      "Mithunam",
      "Kadagam",
      "Simmam",
      "Kanni",
      "Thulam",
      "Vrischikam",
      "Dhanusu",
      "Makaram",
      "Kumbam",
      "Meenam",
    ];
    for (const name of laknams) {
      await Laknam.upsert({ name, isActive: true });
    }

    const rasis = [
      "Mesham",
      "Rishabam",
      "Mithunam",
      "Kadagam",
      "Simmam",
      "Kanni",
      "Thulam",
      "Vrischikam",
      "Dhanusu",
      "Makaram",
      "Kumbam",
      "Meenam",
    ];
    for (const name of rasis) {
      await Rasi.upsert({ name, isActive: true });
    }

    const stars = [
      "Ashwini",
      "Bharani",
      "Krittika",
      "Rohini",
      "Mrigashirsha",
      "Ardra",
      "Punarvasu",
      "Pushya",
      "Ashlesha",
      "Magha",
      "Purva Phalguni",
      "Uttara Phalguni",
      "Hasta",
      "Chitra",
      "Swati",
      "Vishakha",
      "Anuradha",
      "Jyeshtha",
      "Mula",
      "Purva Ashadha",
      "Uttara Ashadha",
      "Shravana",
      "Dhanishta",
      "Shatabhisha",
      "Purva Bhadrapada",
      "Uttara Bhadrapada",
      "Revati",
    ];
    for (const name of stars) {
      await Star.upsert({ name, isActive: true });
    }

    console.log("Horoscope Master Data synchronized.");
  } catch (error) {
    console.error("Error seeding master data:", error);
  }
};
