import { useState, useEffect } from "react";
import { updateStudent, getBloodGroups } from "../api/api";
import axios from "axios";
import "./UpdateStudent.css";

export default function UpdateStudent() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    bloodGroupId: "",
    height: "",
    weight: "",
    bmi: "",
    email: "",
    phone: "",
  });

  const [bloodGroups, setBloodGroups] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchBloodGroups() {
      try {
        const res = await getBloodGroups();
        setBloodGroups(res.data);
      } catch (err) {
        console.error("Error fetching blood groups:", err);
      }
    }
    fetchBloodGroups();
  }, []);

  const calculateBMI = (height, weight) => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return "";
    return (w / ((h / 100) * (h / 100))).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "height" || name === "weight") {
      updatedData.bmi = calculateBMI(
        name === "height" ? value : formData.height,
        name === "weight" ? value : formData.weight
      );
    }
    setFormData(updatedData);
  };

  // ✅ Fetch student by ID
      const fetchStudent = async (id) => {
  if (!id) {
    setMessage("❌ Please enter a Student ID.");
    return;
  }

  try {
    const res = await axios.get(`http://localhost:5000/api/students/${id}`);
    setFormData({
      id: res.data.id,
      name: res.data.name || "",
      bloodGroupId: res.data.blood_group_id || "",
      height: res.data.height_cm || "",
      weight: res.data.weight_kg || "",
      bmi: res.data.bmi || "",
      email: res.data.email || "",
      phone: res.data.phone || "",
    });
    setMessage(""); // clear old error
  } catch (err) {
    console.error("Error fetching student:", err);
    setMessage("❌ Student not found.");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, bloodGroupId, height, weight, email, phone } = formData;

    if (!id) {
      setMessage("❌ Student ID is required.");
      return;
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (bloodGroupId) updateData.blood_group_id = parseInt(bloodGroupId);
    if (height) updateData.height_cm = parseFloat(height);
    if (weight) updateData.weight_kg = parseFloat(weight);
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    try {
      const res = await updateStudent(id, updateData);
      if (res.status === 200) {
        setMessage("✅ Student updated successfully.");
      } else {
        setMessage("❌ Failed to update student.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="form-container">
      <h2>🔄 Update Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Student ID"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={() => fetchStudent(formData.id)}>Fetch Details</button>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <select
          name="bloodGroupId"
          value={formData.bloodGroupId}
          onChange={handleChange}
        >
          <option value="">-- Select Blood Group --</option>
          {bloodGroups.map((bg) => (
            <option key={bg.id} value={bg.id}>
              {bg.group_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bmi"
          placeholder="BMI"
          value={formData.bmi}
          readOnly
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
