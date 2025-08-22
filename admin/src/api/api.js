import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// ✅ Get all students
export const getStudents = () => axios.get(`${API_BASE}/students`);

// ✅ Add a student
export const addStudent = (student) => axios.post(`${API_BASE}/students`, student);

// ✅ Update student
export const updateStudent = (id, student) => axios.put(`${API_BASE}/students/${id}`, student);

// ✅ Delete student
export const deleteStudent = (id) => axios.delete(`${API_BASE}/students/${id}`);

// ✅ Get blood groups
export const getBloodGroups = () => axios.get(`${API_BASE}/blood-groups`);
