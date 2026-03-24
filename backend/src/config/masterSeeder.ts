import { sequelize } from "../models/sequelize";
import * as fs from "fs";
import * as path from "path";

const seedOrder = [
  "Country",
  "State",
  "City",
  "MotherTongue",
  "Religion",
  "Caste",
  "Height",
  "Education",
  "EmploymentType",
  "Occupation",
  "Currency",
  "IncomeRange",
  "Star",
  "Laknam",
  "Gothram",
  "Rasi",
  "Badge",
  "Plan",
  "Coupon",
  "User",
  "UserProfile",
  "UserPreference",
  "Subscription",
  "FamilyDetails",
  "HoroscopeDetails",
  "LocationLifestyle",
  "EducationCareer",
  "UserPhoto",
  "UserDraft",
  "Match",
  "Message",
  "Waitlist",
  "Notification",
  "ProfileView",
  "PhoneViewLog",
  "Interest",
  "Payment",
  "Block",
  "Report",
  "SuccessStory"
];

// Helper to map model names to JSON keys matching extractedData.json format
const modelToKey = (modelName: string) => {
  return modelName.charAt(0).toLowerCase() + modelName.slice(1) + "s";
};

export const seedMasterData = async () => {
  try {
    const extractFile = process.env.VERCEL === "1" 
      ? path.join(process.cwd(), "extractedData.json") 
      : path.join(__dirname, "..", "..", "extractedData.json");

    if (!fs.existsSync(extractFile)) {
      console.log("No extractedData.json found. Skipping automated seeding.");
      return;
    }

    const models = sequelize.models;
    const fileContent = fs.readFileSync(extractFile, "utf-8");
    const parsedData = JSON.parse(fileContent);

    for (const modelName of seedOrder) {
      if (!models[modelName]) continue;
      
      const key = modelToKey(modelName);
      // Wait, let's just do a case-insensitive search if exact key doesn't work
      const data = parsedData[key] || parsedData[modelName] || parsedData[modelName.toLowerCase() + "s"];
      
      if (data && Array.isArray(data) && data.length > 0) {
        const count = await models[modelName].count();
        if (count === 0) {
          console.log(`[SEEDER] Restoring ${modelName} with ${data.length} records...`);
          await models[modelName].bulkCreate(data, { ignoreDuplicates: true });
        } else {
          console.log(`[SEEDER] ${modelName} already has ${count} records. Skipping.`);
        }
      }
    }
    console.log("[SEEDER] Database successfully synchronized with live extracted seeds.");
  } catch (error) {
    console.error("[SEEDER] Error seeding master data:", error);
  }
};
