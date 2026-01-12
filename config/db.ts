import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

// console.log(
//   "DB HOST:",
//   new URL(process.env.DATABASE_URL).hostname
// );

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
