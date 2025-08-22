import express from "express";
import { pool } from "../models/db.js";

const router = express.Router();

// ✅ Get all blood groups
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM blood_groups");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching blood groups:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
