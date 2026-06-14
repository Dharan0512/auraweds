import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const postgresUri =
  process.env.POSTGRES_URI ||
  "postgres://postgres:postgres@localhost:5432/auraweds";

// Managed Postgres providers (Supabase, Neon, RDS, etc.) require SSL. Enable it
// in production / on Vercel; keep it off for a plain local Postgres.
const useSSL =
  process.env.PGSSL === "true" ||
  process.env.NODE_ENV === "production" ||
  !!process.env.VERCEL ||
  (!postgresUri.includes("localhost") && !postgresUri.includes("127.0.0.1"));

// On Vercel each request runs in a short-lived, frozen-between-invocations
// function instance. A normal long-lived pool either (a) exhausts the DB's
// connection limit as instances pile up, or (b) hands back a TCP socket the DB
// already closed during the freeze -> "Connection terminated unexpectedly".
// Keep the pool tiny and let idle connections die quickly.
const isServerless = !!process.env.VERCEL;

export const sequelize = new Sequelize(postgresUri, {
  dialect: "postgres",
  logging: false,
  dialectModule: pg,
  pool: isServerless
    ? { max: 2, min: 0, idle: 5000, acquire: 30000, evict: 5000 }
    : { max: 5, min: 0, idle: 10000 },
  dialectOptions: useSSL
    ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      // Detect dead sockets early instead of hanging the function.
      keepAlive: true,
    }
    : {},
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
