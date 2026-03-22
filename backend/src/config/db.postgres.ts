import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import * as pg from "pg";
dotenv.config();

const postgresUri =
  process.env.POSTGRES_URI ||
  "postgres://postgres:postgres@localhost:5432/auraweds";

export const sequelize = new Sequelize(postgresUri, {
  dialect: "postgres",
  logging: false,
  dialectModule: pg,
  dialectOptions: {
    // For many cloud providers, you might need SSL
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  },
});

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL (Sequelize) connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
    throw error;
  }
};
