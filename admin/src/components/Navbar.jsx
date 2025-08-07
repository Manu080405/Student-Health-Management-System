// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Admin Panel</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/update">Update</Link>
        <Link to="/delete">Delete</Link>
      </div>
    </nav>
  );
}
