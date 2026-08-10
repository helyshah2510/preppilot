import "./InterviewResult.css";
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function InterviewResult() {
  const navigate = useNavigate();

  return (
    <div className="interview-result">

      <div className="result-header">
        <div className="result-icon">
          <CheckCircle2 size={32} />
        </div>

        <h1>Interview Complete!</h1>

        <p>
          Here's how you performed in your React technical interview.
        </p>
      </div>


      {/* Overall Score */}

      <section className="overall-score-card">

        <p>Overall Score</p>

        <div className="score">
          84<span>%</span>
        </div>

        <span className="score-label">
          Good Performance
        </span>

      </section>


      {/* Performance */}

      <section className="performance-card">

        <div className="section-heading">
          <h2>Performance Breakdown</h2>

          <p>
            Your performance across key interview areas.
          </p>
        </div>


        <div className="performance-list">

          <div className="performance-item">

            <div className="performance-info">
              <span>Technical Knowledge</span>
              <strong>88%</strong>
            </div>

            <div className="performance-bar">
              <span style={{ width: "88%" }}></span>
            </div>

          </div>


          <div className="performance-item">

            <div className="performance-info">
              <span>Communication</span>
              <strong>81%</strong>
            </div>

            <div className="performance-bar">
              <span style={{ width: "81%" }}></span>
            </div>

          </div>


          <div className="performance-item">

            <div className="performance-info">
              <span>Problem Solving</span>
              <strong>86%</strong>
            </div>

            <div className="performance-bar">
              <span style={{ width: "86%" }}></span>
            </div>

          </div>

        </div>

      </section>


      {/* Feedback */}

      <div className="feedback-grid">

        <section className="feedback-card">

          <div className="feedback-title">
            <CheckCircle2 size={20} />
            <h2>What You Did Well</h2>
          </div>

          <ul>
            <li>Strong understanding of React fundamentals.</li>
            <li>Good explanation of technical concepts.</li>
            <li>Clear approach to solving problems.</li>
          </ul>

        </section>


        <section className="feedback-card">

          <div className="feedback-title improvement">
            <AlertCircle size={20} />
            <h2>Areas to Improve</h2>
          </div>

          <ul>
            <li>Improve knowledge of React performance optimization.</li>
            <li>Give more detailed explanations for advanced concepts.</li>
            <li>Work on answering complex questions more confidently.</li>
          </ul>

        </section>

      </div>


      {/* AI Feedback */}

      <section className="ai-feedback">

        <div className="section-heading">
          <h2>AI Feedback</h2>

          <p>
            Personalized feedback based on your interview performance.
          </p>
        </div>

        <p className="feedback-text">
          You demonstrated a solid understanding of React fundamentals
          and communicated your ideas clearly. Your strongest area was
          problem solving. Focus on React performance optimization and
          advanced patterns to improve your next interview.
        </p>

      </section>


      {/* Actions */}

      <div className="result-actions">

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <button
          className="retry-btn"
          onClick={() => navigate("/mock-interview")}
        >
          <RotateCcw size={18} />
          Practice Again
        </button>

      </div>

    </div>
  );
}

export default InterviewResult;