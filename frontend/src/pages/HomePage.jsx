import "./HomePage.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to the <span>Student Portal</span></h1>
        <p className="hero-subtitle">
          Manage student details, BMI & contact info — beautifully.
        </p>
        <Link to="/students" className="view-button">
          View Students
        </Link>
      </div>
    </div>
  );
}

export default Home;
