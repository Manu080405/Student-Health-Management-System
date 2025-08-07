import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../models/db.js"; // ✅ Correct named import

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET not found in .env");
}

// ✅ Register route (optional — use only if you're manually registering admins)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Missing username or password" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admins (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});


// ✅ Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  try {
    const [rows] = await pool.query(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );
    const admin = rows[0];

    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Found admin:", admin);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});



export default router;
