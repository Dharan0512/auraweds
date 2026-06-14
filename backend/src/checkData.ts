import { User, UserProfile } from "./models/sequelize";
import { connectPostgres } from "./config/db.postgres";

async function checkData() {
  await connectPostgres();
  const userCount = await User.count();
  const profileCount = await UserProfile.count();
  console.log(`Users: ${userCount}`);
  console.log(`UserProfiles: ${profileCount}`);

  const sampleUsers = await User.findAll({ limit: 5 });
  console.log(
    "Sample Users:",
    JSON.stringify(
      sampleUsers.map((u) => ({ id: u.id, gender: u.gender, email: u.email })),
      null,
      2,
    ),
  );

  const sampleProfiles = await UserProfile.findAll({ limit: 5 });
  console.log(
    "Sample Profiles:",
    JSON.stringify(
      sampleProfiles.map((p) => ({
        id: p.id,
        userId: p.userId,
        religionId: p.religionId,
        dob: p.dob,
      })),
      null,
      2,
    ),
  );

  process.exit(0);
}

checkData();
