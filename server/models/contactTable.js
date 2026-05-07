import database from "../database/db.js";

export async function createContactTable() {
  try {
    await database.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;

    await database.query(query);
  } catch (error) {
    console.error("❌ Failed To Create Contact Table.", error);
    process.exit(1);
  }
}
