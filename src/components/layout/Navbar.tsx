import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="logo-icon">🚀</span>
        <h2>PrepPilot</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#how-it-works">How It Works</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="navbar__buttons">
        <Link to="/login" className="btn-secondary">
            Sign In
        </Link>

        <Link to="/signup" className="btn-primary">
            Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;