import { sequelize, Plan } from "./models/sequelize";
import { connectPostgres } from "./config/db.postgres";

async function checkPlans() {
  await connectPostgres();
  const plans = await Plan.findAll();
  console.log("Seeded Plans:", JSON.stringify(plans, null, 2));
  process.exit(0);
}

checkPlans();
