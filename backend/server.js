import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/students.js";
import adminAuthRoutes from "./routes/adminAuth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/admin", adminAuthRoutes); // ✅ here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
