import database from "../database/db.js";

export async function createJobTable() {
  try {
    await database.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    const query = `
      CREATE TABLE IF NOT EXISTS job_posts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        job_type VARCHAR(50) NOT NULL,
        experience VARCHAR(100),
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;

    await database.query(query);
    // console.log("✅ Job Post Table Created or Already Exists.");
  } catch (error) {
    console.error("❌ Failed To Create Job Post Table.", error);
    process.exit(1);
  }
}

export const getAllJobsFromDB = async () => {
  try {
    const result = await database.query(
      "SELECT * FROM job_posts WHERE is_active = true ORDER BY created_at DESC",
    );
    return result.rows;
  } catch (err) {
    console.error("❌ Error fetching jobs from DB:", err);
    throw err;
  }
};

export const insertJobToDB = async (jobData) => {
  const { title, category, location, job_type, experience, description } =
    jobData;
  const queryText = `
    INSERT INTO job_posts (title, category, location, job_type, experience, description)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;
  `;
  const values = [title, category, location, job_type, experience, description];

  try {
    const result = await database.query(queryText, values);
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error inserting job into DB:", err);
    throw err;
  }
};
