import "./Auth.css";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="auth-page">

      <div className="auth-glow"></div>

      <div className="auth-card">

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Log in to keep practicing.
        </p>

        <form className="auth-form">

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-input">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

          </div>

          <div className="forgot-password">
            <Link to="/">Forgot Password?</Link>
          </div>

          <button className="auth-btn">
            Log In
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

    </section>
  );
}

export default Login;