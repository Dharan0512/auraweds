import { User, UserProfile, UserPreference } from "../models/sequelize";
import { sequelize } from "../config/db.postgres";

async function fix() {
  try {
    await sequelize.authenticate();

    const userId = 1;
    const user = await User.findByPk(userId);

    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      process.exit(1);
    }

    // Check if profile exists
    const existingProfile = await UserProfile.findOne({ where: { userId } });
    if (!existingProfile) {
      console.log(`Creating default profile for user ${userId}...`);
      await UserProfile.create({
        userId,
        maritalStatus: "Never Married",
        physicalStatus: "Normal",
        childrenCount: 0,
      });
      console.log("Profile created.");
    } else {
      console.log("Profile already exists.");
    }

    // Check if preferences exist
    const existingPrefs = await UserPreference.findOne({
      where: { userId },
    });
    if (!existingPrefs) {
      console.log(`Creating default preferences for user ${userId}...`);
      await UserPreference.create({
        userId,
        minAge: 18,
        maxAge: 40,
      });
      console.log("Preferences created.");
    } else {
      console.log("Preferences already exist.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Fix failed:", error);
    process.exit(1);
  }
}

fix();
