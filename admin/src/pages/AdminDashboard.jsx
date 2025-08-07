// src/pages/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token
    navigate("/admin/login"); // Redirect to login
  };

  return (
    <div className="admin-home">
      <div className="admin-card">
        <h1>📊 Welcome to the Admin Dashboard</h1>
        <p>Manage students, track BMI, and maintain accurate records efficiently.</p>
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
}
