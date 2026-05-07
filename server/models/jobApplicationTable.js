import database from "../database/db.js";

/**
 * Creates the job_applications table to store candidate details
 */
export async function createJobApplicationTable() {
  try {
    // Ensure pgcrypto is available for UUID generation
    await database.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    const query = `
      CREATE TABLE IF NOT EXISTS job_applications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        job_id UUID NOT NULL REFERENCES job_posts(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        resume_link TEXT NOT NULL, 
        cover_letter TEXT,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;

    await database.query(query);
    // console.log("✅ Job Application Table Created or Already Exists.");
  } catch (error) {
    console.error("❌ Failed To Create Job Application Table.", error);
    process.exit(1);
  }
}

/**
 * Inserts a new job application into the database
 */
export const saveApplicationToDB = async (applicationData) => {
  const { job_id, full_name, email, resume_link, cover_letter } =
    applicationData;
  const queryText = `
    INSERT INTO job_applications (job_id, full_name, email, resume_link, cover_letter)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
  `;
  const values = [job_id, full_name, email, resume_link, cover_letter];

  try {
    const result = await database.query(queryText, values);
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error saving application to DB:", err);
    throw err;
  }
};
