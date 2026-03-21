import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

import { User } from "../models/sequelize/User";

const makeAdmin = async () => {
  const email = process.argv[2];
  if (!email) {
    console.error("Please provide an email address as an argument.");
    process.exit(1);
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();
    console.log(`Successfully made ${email} an admin!`);
    process.exit(0);
  } catch (error) {
    console.error("Error making user admin:", error);
    process.exit(1);
  }
};

makeAdmin();
