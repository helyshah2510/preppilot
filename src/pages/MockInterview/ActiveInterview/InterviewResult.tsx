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

  // Get the AI evaluation result
  const storedResult = sessionStorage.getItem(
    "preppilot-interview-result"
  );

  // Get interview information
  const storedInterview = sessionStorage.getItem(
    "preppilot-interview"
  );

  const result = storedResult
    ? JSON.parse(storedResult)
    : null;

  const interview = storedInterview
    ? JSON.parse(storedInterview)
    : null;

  const interviewType = interview?.type || "Technical";

  // If there is no result data
  if (!result) {
    return (
      <div className="result-header">
        <div className="result-icon">
          <AlertCircle size={32} />
        </div>

        <h1>No Interview Result Found</h1>

        <p>
          We couldn't find a completed interview result.
          Please complete an interview first.
        </p>

        <div className="result-actions">
          <button
            className="back-btn"
            onClick={() =>
              navigate("/mock-interview")
            }
          >
            <ArrowLeft size={18} />
            Back to Mock Interview
          </button>
        </div>
      </div>
    );
  }

  const overallScore = result.overallScore ?? 0;

  const categories = Array.isArray(result.categories)
    ? result.categories
    : [];

  const strengths = Array.isArray(result.strengths)
    ? result.strengths
    : [];

  const improvements = Array.isArray(
    result.improvements
  )
    ? result.improvements
    : [];

  const feedback = result.feedback || "";

  // Decide the performance label
  const getScoreLabel = (score: number) => {
    if (score >= 90) {
      return "Excellent Performance";
    }

    if (score >= 75) {
      return "Good Performance";
    }

    if (score >= 60) {
      return "Fair Performance";
    }

    return "Needs Improvement";
  };

  return (
    <div className="interview-result-page">
      {/* Header */}

      <div className="result-header">
        <div className="result-icon">
          <CheckCircle2 size={32} />
        </div>

        <h1>Interview Complete!</h1>

        <p>
          Here's how you performed in your{" "}
          <strong>{interviewType}</strong> interview.
        </p>
      </div>

      {/* Overall Score */}

      <section className="overall-score-card">
        <p>Overall Score</p>

        <div className="score">
          {overallScore}
          <span>%</span>
        </div>

        <span className="score-label">
          {getScoreLabel(overallScore)}
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
          {categories.map(
            (
              category: {
                name: string;
                score: number;
              },
              index: number
            ) => (
              <div
                className="performance-item"
                key={index}
              >
                <div className="performance-info">
                  <span>{category.name}</span>

                  <strong>
                    {category.score}%
                  </strong>
                </div>

                <div className="performance-bar">
                  <span
                    style={{
                      width: `${category.score}%`,
                    }}
                  ></span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Feedback */}

      <div className="feedback-grid">
        {/* Strengths */}

        <section className="feedback-card">
          <div className="feedback-title">
            <CheckCircle2 size={20} />

            <h2>What You Did Well</h2>
          </div>

          <ul>
            {strengths.map(
              (strength: string, index: number) => (
                <li key={index}>{strength}</li>
              )
            )}
          </ul>
        </section>

        {/* Improvements */}

        <section className="feedback-card">
          <div className="feedback-title improvement">
            <AlertCircle size={20} />

            <h2>Areas to Improve</h2>
          </div>

          <ul>
            {improvements.map(
              (
                improvement: string,
                index: number
              ) => (
                <li key={index}>
                  {improvement}
                </li>
              )
            )}
          </ul>
        </section>
      </div>

      {/* AI Feedback */}

      <section className="ai-feedback">
        <div className="section-heading">
          <h2>AI Feedback</h2>

          <p>
            Personalized feedback based on your{" "}
            {interviewType} interview performance.
          </p>
        </div>

        <p className="feedback-text">
          {feedback}
        </p>
      </section>

      {/* Actions */}

      <div className="result-actions">
        <button
          className="back-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <button
          className="retry-btn"
          onClick={() =>
            navigate("/mock-interview")
          }
        >
          <RotateCcw size={18} />
          Practice Again
        </button>
      </div>
    </div>
  );
}

export default InterviewResult;