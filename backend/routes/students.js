import express from "express";
import { pool } from "../models/db.js";

const router = express.Router();

// ✅ Get all students (with blood group + BMI calculated)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.id, 
        s.name, 
        s.height_cm, 
        s.weight_kg, 
        ROUND(s.weight_kg / POWER(s.height_cm/100, 2), 2) AS bmi,
        s.email, 
        s.phone, 
        s.created_at,
        bg.group_name AS blood_group
      FROM students s
      LEFT JOIN blood_groups bg ON s.blood_group_id = bg.id
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a student
router.post("/", async (req, res) => {
  try {
    const { name, blood_group_id, height, weight, email, phone } = req.body;

    const heightCm = parseFloat(height);
    const weightKg = parseFloat(weight);

    if (!heightCm || !weightKg) {
      return res.status(400).json({ message: "Height and weight are required." });
    }

    await pool.query(
      "INSERT INTO students (name, blood_group_id, height_cm, weight_kg, email, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [name, blood_group_id, heightCm, weightKg, email, phone]
    );

    res.status(201).json({ message: "✅ Student added successfully" });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Get single student by ID
// GET student by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// ✅ Update student
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, blood_group_id, height_cm, weight_kg, email, phone } = req.body;

  try {
    const fields = [];
    const values = [];

    if (name !== undefined && name !== "") {
      fields.push("name = ?");
      values.push(name);
    }
    if (blood_group_id !== undefined && blood_group_id !== "") {
      fields.push("blood_group_id = ?");
      values.push(blood_group_id);
    }
    if (height_cm !== undefined && height_cm !== "") {
      fields.push("height_cm = ?");
      values.push(height_cm);
    }
    if (weight_kg !== undefined && weight_kg !== "") {
      fields.push("weight_kg = ?");
      values.push(weight_kg);
    }
    if (email !== undefined && email !== "") {
      fields.push("email = ?");
      values.push(email);
    }
    if (phone !== undefined && phone !== "") {
      fields.push("phone = ?");
      values.push(phone);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No valid fields provided" });
    }

    values.push(id);

    await pool.query(
      `UPDATE students SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    res.json({ message: "✅ Student updated successfully" });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// ✅ Delete student
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "✅ Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
