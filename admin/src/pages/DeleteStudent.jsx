// src/pages/DeleteStudent.jsx
import { useState } from "react";
import { deleteStudent } from "../api/api"; // ✅ import the API function
import "./DeleteStudent.css";

export default function DeleteStudent() {
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await deleteStudent(studentId);

      if (res.status === 200) {
        setMessage(`✅ Student with ID ${studentId} deleted successfully.`);
        setStudentId("");
      } else {
        setMessage(`❌ Failed to delete student with ID ${studentId}.`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Server error occurred.");
    }
  };

  return (
    <div className="delete-container">
      <form className="delete-form" onSubmit={handleDelete}>
        <h2>🗑️ Delete Student</h2>

        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />

        <button type="submit">Delete</button>
        {message && <p className="delete-message">{message}</p>}
      </form>
    </div>
  );
}
