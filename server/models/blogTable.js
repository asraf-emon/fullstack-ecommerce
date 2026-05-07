import database from "../database/db.js";

export async function createBlogTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS blogs (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100) DEFAULT 'Asraf Emon',
        category VARCHAR(50) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;

    await database.query(query);
    // console.log("✅ Blog Table Created Successfully.");
  } catch (error) {
    console.error("❌ Failed To Create Blog Table.", error);
  }
}

export const insertBlogToDB = async (blogData) => {
  const { title, excerpt, content, category, image_url } = blogData;
  const queryText = `
    INSERT INTO blogs (title, excerpt, content, category, image_url)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;
  const values = [title, excerpt, content, category, image_url];
  const result = await database.query(queryText, values);
  return result.rows[0];
};

export const getAllBlogsFromDB = async () => {
  const result = await database.query(
    "SELECT * FROM blogs ORDER BY created_at DESC",
  );
  return result.rows;
};

export const getSingleBlogFromDB = async (id) => {
  const queryText = "SELECT * FROM blogs WHERE id = $1";
  const result = await database.query(queryText, [id]);
  return result.rows[0];
};

export const updateBlogInDB = async (id, blogData) => {
  const { title, excerpt, content, category, image_url } = blogData;
  const queryText = `
    UPDATE blogs 
    SET title = $1, excerpt = $2, content = $3, category = $4, image_url = $5
    WHERE id = $6 
    RETURNING *;
  `;
  const values = [title, excerpt, content, category, image_url, id];
  const result = await database.query(queryText, values);
  return result.rows[0];
};

export const deleteBlogFromDB = async (id) => {
  const queryText = "DELETE FROM blogs WHERE id = $1 RETURNING *;";
  const result = await database.query(queryText, [id]);
  return result.rows[0];
};
