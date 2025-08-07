// src/pages/AddStudent.jsx
import { useState } from "react";
import { addStudent } from "../api/api"; // ✅ Import API
import "./AddStudent.css";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    height: "",
    weight: "",
    email: "",
    phone: "",
  });

  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

if (updated.height && updated.weight) {
  const h = parseFloat(updated.height) / 100;
  const w = parseFloat(updated.weight);

  if (!isNaN(h) && !isNaN(w) && h > 0) {
    const calc = w / (h * h);
    setBmi(calc.toFixed(2));
  } else {
    setBmi(null);
  }
} else {
  setBmi(null);
}

  };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const height = parseFloat(formData.height);
  const weight = parseFloat(formData.weight);

  // Validate inputs
  if (!height || !weight) {
    setMessage("❌ Please enter valid height and weight.");
    return;
  }

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);

  if (isNaN(bmi)) {
    setMessage("❌ Could not calculate BMI.");
    return;
  }

  const payload = {
    ...formData, // ✅ send correct float
  };

  try {
    const res = await addStudent(payload);
    setMessage(res.ok ? "✅ Student added!" : "❌ Failed to add student.");

    if (res.ok) {
      setFormData({
        name: "",
        bloodGroup: "",
        height: "",
        weight: "",
        email: "",
        phone: "",
      });
    }
  } catch (err) {
    console.error("API error:", err);
    setMessage("❌ Server error");
  }
};



  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        {bmi && <p><strong>BMI:</strong> {bmi}</p>}
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
