import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary navigation
    // Tomorrow this will be replaced with Supabase authentication
    navigate("/dashboard");
  };

  return (
    <section className="auth-page">
      <div className="auth-glow"></div>

      <div className="auth-card">
        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Start practicing in under a minute.
        </p>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="John Doe"
            />
          </div>

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
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <div className="password-input">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button className="auth-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="terms">
          By signing up you agree to our
          <Link to="/"> Terms</Link> &
          <Link to="/"> Privacy Policy</Link>
        </p>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Log In</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;