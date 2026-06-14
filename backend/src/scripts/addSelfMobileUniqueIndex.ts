import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db.postgres";

const INDEX_NAME = "uniq_users_self_mobile";

/**
 * Adds a partial unique index enforcing one "Self" profile per phone number.
 * Profiles created for others (Daughter, Son, ...) are exempt, and rows with a
 * NULL mobile are allowed to repeat (Postgres treats NULLs as distinct).
 *
 * Safe to run repeatedly: the index is created with IF NOT EXISTS. The script
 * first reports any existing duplicates, since the index cannot be created
 * while conflicting "Self" rows share a mobile number.
 */
async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL.");

    // Surface conflicting data up front — index creation fails otherwise.
    const duplicates = await sequelize.query<{
      mobile: string;
      count: string;
    }>(
      `SELECT "mobile", COUNT(*) AS count
         FROM "users"
        WHERE "createdFor" = 'Self'
          AND "mobile" IS NOT NULL
          AND "deletedAt" IS NULL
        GROUP BY "mobile"
       HAVING COUNT(*) > 1`,
      { type: QueryTypes.SELECT },
    );

    if (duplicates.length > 0) {
      console.error(
        `Cannot create unique index: ${duplicates.length} phone number(s) already have multiple "Self" profiles.`,
      );
      console.table(duplicates);
      console.error(
        "Resolve these duplicates (merge/soft-delete) before re-running.",
      );
      process.exit(1);
    }

    await sequelize.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "${INDEX_NAME}"
         ON "users" ("mobile")
       WHERE "createdFor" = 'Self'`,
    );

    console.log(`Index "${INDEX_NAME}" is in place.`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to create unique index:", error);
    process.exit(1);
  }
}

run();
