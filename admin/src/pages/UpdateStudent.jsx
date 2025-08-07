// src/pages/UpdateStudent.jsx
import { useState } from "react";
import { updateStudent } from "../api/api";
import "./UpdateStudent.css";

export default function UpdateStudent() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    bloodGroup: "",
    height: "",
    weight: "",
    bmi: "",
  });

  const [message, setMessage] = useState("");

  const calculateBMI = (height, weight) => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return "";
    const bmi = w / ((h / 100) * (h / 100));
    return bmi.toFixed(2);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, name, bloodGroup, height, weight } = formData;

    if (!height || !weight) {
      setMessage("❌ Height and Weight are required.");
      return;
    }

    try {
      const res = await updateStudent(id, {
        name,
        blood_group: bloodGroup,
        height_cm: parseFloat(height),
        weight_kg: parseFloat(weight),
      });

      if (res.ok) {
        setMessage("✅ Student updated successfully.");
        setFormData({
          id: "",
          name: "",
          bloodGroup: "",
          height: "",
          weight: "",
          bmi: "",
        });
      } else {
        setMessage("❌ Failed to update student.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="update-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>🔄 Update Student</h2>

        <input
          type="text"
          name="id"
          placeholder="Student ID"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
        />

        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="bmi"
          placeholder="BMI"
          value={formData.bmi}
          readOnly
        />

        <button type="submit">Update</button>
        {message && <p className="update-message">{message}</p>}
      </form>
    </div>
  );
}
