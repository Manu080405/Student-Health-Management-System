import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Student<span className="highlight">Zone</span></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
