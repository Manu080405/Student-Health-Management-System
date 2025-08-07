import { pool } from "./models/db.js";

const createTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      blood_group VARCHAR(5),
      height_cm FLOAT,
      weight_kg FLOAT,
      bmi FLOAT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const conn = await pool.getConnection();
    await conn.query(sql);
    console.log("✅ Students table created.");
    conn.release();
  } catch (err) {
    console.error("❌ Failed to create table:", err.message);
    console.log("Full error:", err); // Add this line
  }
};

createTable();
