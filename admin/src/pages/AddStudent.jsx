import React, { useState, useEffect } from "react";
import { addStudent, getBloodGroups } from "../api/api";
import "./AddStudent.css"; // <-- import css

const AddStudent = () => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroups, setBloodGroups] = useState([]);
  const [bloodGroupId, setBloodGroupId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBloodGroups = async () => {
      try {
        const res = await getBloodGroups();
        setBloodGroups(res.data);
      } catch (err) {
        console.error("Error fetching blood groups:", err);
      }
    };
    fetchBloodGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      height,
      weight,
      email,
      phone,
      blood_group_id: bloodGroupId,
    };

    try {
      await addStudent(newStudent);
      setMessage("✅ Student added successfully!");
      setName("");
      setHeight("");
      setWeight("");
      setEmail("");
      setPhone("");
      setBloodGroupId("");
    } catch (err) {
      console.error("Error adding student:", err);
      setMessage("❌ Failed to add student");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          value={bloodGroupId}
          onChange={(e) => setBloodGroupId(e.target.value)}
          required
        >
          <option value="">-- Select Blood Group --</option>
          {bloodGroups.map((bg) => (
            <option key={bg.id} value={bg.id}>
              {bg.group_name}
            </option>
          ))}
        </select>

        <button type="submit">Add Student</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddStudent;
