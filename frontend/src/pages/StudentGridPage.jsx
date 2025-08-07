// src/pages/StudentGrid.jsx
import { useEffect, useState } from "react";
import "./StudentGridPage.css";

function getBMIClass(bmi) {
  if (bmi < 18.5) return "bmi-under";
  if (bmi >= 18.5 && bmi < 25) return "bmi-normal";
  if (bmi >= 25 && bmi < 30) return "bmi-over";
  return "bmi-obese";
}

function StudentGrid() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = () => {
      fetch("http://localhost:5000/api/students")
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => console.error("Error fetching students:", err));
    };

    fetchStudents(); // Initial fetch
    const interval = setInterval(fetchStudents, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="grid-container">
      <h2 className="grid-title">All Students</h2>
      <div className="grid">
        {students.map((student) => (
          <div className={`student-card ${getBMIClass(student.bmi)}`} key={student.id}>
            <h3>{student.name}</h3>
            <p><strong>ID:</strong> {student.id}</p>
            <p>🩸 Blood Group: {student.blood_group}</p>
            <p>📏 Height: {student.height_cm} cm</p>
            <p>⚖️ Weight: {student.weight_kg} kg</p>
            <p>📊 BMI: {student.bmi}</p>
            <p>
              📧 <a href={`mailto:${student.email}`}>{student.email}</a>
            </p>
            <p>
              📞 <a href={`tel:${student.phone}`}>{student.phone}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentGrid;
