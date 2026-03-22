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

export const seedMasterData = async () => {
  try {
    const seedDir = process.env.VERCEL === "1" 
      ? path.join(process.cwd(), "seeds") 
      : path.join(__dirname, "..", "..", "seeds");

    if (!fs.existsSync(seedDir)) {
      console.log("No seeds directory found. Skipping automated seeding.");
      return;
    }

    const models = sequelize.models;

    for (const modelName of seedOrder) {
      if (!models[modelName]) continue;
      
      const seedFile = path.join(seedDir, `${modelName}.json`);
      if (fs.existsSync(seedFile)) {
        const fileContent = fs.readFileSync(seedFile, "utf-8");
        const data = JSON.parse(fileContent);
        
        if (data.length > 0) {
          const count = await models[modelName].count();
          if (count === 0) {
            console.log(`[SEEDER] Restoring ${modelName} with ${data.length} records...`);
            await models[modelName].bulkCreate(data, { ignoreDuplicates: true });
          } else {
            console.log(`[SEEDER] ${modelName} already has ${count} records. Skipping.`);
          }
        }
      }
    }
    console.log("[SEEDER] Database successfully synchronized with live extracted seeds.");
  } catch (error) {
    console.error("[SEEDER] Error seeding master data:", error);
  }
};
