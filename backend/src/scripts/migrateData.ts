import { sequelize as mariaSequelize } from "../config/db.mysql";
import { sequelize as postgresSequelize } from "../config/db.postgres";
import * as Models from "../models/sequelize";

// Order of migration to satisfy foreign key constraints
const migrationOrder = [
  "Country",
  "Currency",
  "Education",
  "EmploymentType",
  "Height",
  "IncomeRange",
  "MotherTongue",
  "Occupation",
  "Religion",
  "Plan",
  "State",
  "City",
  "Caste",
  "User",
  "UserProfile",
  "UserPreference",
  "UserPhoto",
  "Subscription",
  "Payment",
  "Match",
  "Message",
  "Block",
  "Report",
  "SuccessStory",
  "Interest",
];

async function runMigration() {
  try {
    console.log("Starting DB Migration...");
    console.log("Connecting to MariaDB...");
    await mariaSequelize.authenticate();
    console.log("Connecting to PostgreSQL...");
    await postgresSequelize.authenticate();

    console.log("Syncing PostgreSQL schema...");
    // Update all models to use PostgreSQL instance for syncing
    for (const key in Models) {
      const ModelClass = (Models as any)[key];
      if (ModelClass && ModelClass.init) {
        (ModelClass as any).sequelize = postgresSequelize;
      }
    }
    await postgresSequelize.sync({ force: true });
    console.log("PostgreSQL schema synced (tables recreated).");

    for (const modelName of migrationOrder) {
      const ModelClass = (Models as any)[modelName];
      if (!ModelClass) {
        console.warn(`Model ${modelName} not found in index.ts`);
        continue;
      }

      console.log(`\n>>> Migrating ${modelName}...`);

      // 1. Fetch data from MariaDB
      (ModelClass as any).sequelize = mariaSequelize;
      const records = await ModelClass.findAll({ raw: true });
      console.log(`   Found ${records.length} records in MariaDB.`);

      if (records.length > 0) {
        // 2. Insert into PostgreSQL
        (ModelClass as any).sequelize = postgresSequelize;
        await ModelClass.bulkCreate(records);
        console.log(
          `   Successfully inserted ${records.length} records into PostgreSQL.`,
        );

        // 3. Update PostgreSQL sequence to avoid ID conflicts later
        const tableName = ModelClass.getTableName();
        // Handle both "string" and { tableName: "...", schema: "..." }
        const actualTableName =
          typeof tableName === "string" ? tableName : tableName.tableName;

        try {
          await postgresSequelize.query(
            `SELECT setval(pg_get_serial_sequence('"${actualTableName}"', 'id'), coalesce(max(id), 1), max(id) IS NOT NULL) FROM "${actualTableName}";`,
          );
          console.log(`   Updated sequence for ${actualTableName}.`);
        } catch (seqError) {
          // Some tables might not have a serial 'id'
          console.log(
            `   (Skip sequence update for ${actualTableName} - likely no serial id)`,
          );
        }
      }
    }

    console.log("\n=================================");
    console.log("MIGRATION COMPLETED SUCCESSFULLY!");
    console.log("=================================");
  } catch (error) {
    console.error("\n=================================");
    console.error("MIGRATION FAILED!");
    console.error(error);
    console.error("=================================");
    process.exit(1);
  } finally {
    await mariaSequelize.close();
    await postgresSequelize.close();
  }
}

runMigration();
