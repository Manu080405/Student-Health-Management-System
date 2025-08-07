// src/api/api.js

const API_BASE = "http://localhost:5000/api";

// Existing: Add Student
export async function addStudent(studentData) {
  return await fetch(`${API_BASE}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
}

// ✅ New: Update Student
export async function updateStudent(id, updatedData) {
  return await fetch(`${API_BASE}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
}

// ✅ New: Delete Student
export async function deleteStudent(id) {
  return await fetch(`${API_BASE}/students/${id}`, {
    method: "DELETE",
  });
}
