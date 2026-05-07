import pkg from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "config/config.env" });

const { Pool } = pkg;

const database = new Pool({
  connectionString: String(process.env.DATABASE_URL),
});

export default database;
