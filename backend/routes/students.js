import express from "express";
import { pool } from "../models/db.js";

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a student
router.post("/", async (req, res) => {
  try {
    const { name, bloodGroup, height, weight, email, phone } = req.body;

    const heightCm = parseFloat(height);
    const weightKg = parseFloat(weight);

    // Validate height & weight
    if (!heightCm || !weightKg) {
      return res.status(400).json({ message: "Height and weight are required." });
    }

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    if (isNaN(bmi)) {
      return res.status(400).json({ message: "Invalid BMI calculation." });
    }

    await pool.query(
      "INSERT INTO students (name, blood_group, height_cm, weight_kg, bmi, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, bloodGroup, heightCm, weightKg, bmi.toFixed(2), email, phone]
    );

    res.status(201).json({ message: "✅ Student added successfully" });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Update student
// Update student
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, blood_group, height_cm, weight_kg } = req.body;

  const height = parseFloat(height_cm);
  const weight = parseFloat(weight_kg);

  // Validate height & weight
  if (!height || !weight) {
    return res.status(400).json({ message: "Height and weight are required." });
  }

  // Calculate BMI
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  if (isNaN(bmi)) {
    return res.status(400).json({ message: "Invalid BMI calculation." });
  }

  try {
    await pool.query(
      "UPDATE students SET name = ?, blood_group = ?, height_cm = ?, weight_kg = ?, bmi = ? WHERE id = ?",
      [name, blood_group, height, weight, bmi.toFixed(2), id]
    );
    res.json({ message: "✅ Student updated successfully" });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete student
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
