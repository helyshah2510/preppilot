import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <h2>🚀 PrepPilot</h2>

        <p>Practice Smarter. Get Hired Faster.</p>

      </div>

      <div className="footer-links">

        <div>
          <h3>Product</h3>

          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Dashboard</a>
        </div>

        <div>
          <h3>Resources</h3>

          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <div>
          <h3>Company</h3>

          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Support</a>
        </div>

      </div>

      <div className="footer-bottom">

        © 2026 PrepPilot. All rights reserved.

      </div>

    </footer>
  );
}

export default Footer;