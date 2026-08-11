import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./DSAResult.css";

interface PerformanceBreakdown {
  logic: number;
  problemSolving: number;
  syntax: number;
  optimization: number;
}

interface WeakArea {
  title: string;
  description: string;
}

interface Recommendation {
  title: string;
  detail: string;
}

interface QuestionResult {
  questionNumber: number;
  title: string;
  userAnswer: string;
  score: number;
  feedback: string;
}

interface DSAResultData {
  id: string;
  topic: string;
  difficulty: string;
  overall_score: number;
  strong_count: number;
  needs_improvement_count: number;
  overall_feedback: string;
  performance_breakdown: PerformanceBreakdown;
  weak_areas: WeakArea[];
  recommendations: Recommendation[];
  question_results: QuestionResult[];
}

function DSAResult() {
  const { topic, difficulty } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState<DSAResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!topic || !difficulty) return;

    const loadResult = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please log in to view your results.");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("dsa_results")
        .select("*")
        .eq("user_id", user.id)
        .eq("topic", topic)
        .eq("difficulty", difficulty)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error(fetchError);
        setError("Could not load your result.");
        setLoading(false);
        return;
      }

      if (!data) {
        setError("No result found for this topic and difficulty yet.");
        setLoading(false);
        return;
      }

      setResult(data as DSAResultData);
      setLoading(false);
    };

    loadResult();
  }, [topic, difficulty]);

  if (loading) {
    return <h2>Loading your results...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!result) {
    return null;
  }

  const breakdown = result.performance_breakdown;

  return (
    <main className="dsa-result-page">
      <div className="dsa-result-container">

        {/* Header */}
        <div className="dsa-result-header">
          <h1>DSA Practice Result</h1>
          <p className="dsa-result-meta">
            {result.topic} · {result.difficulty}
          </p>

          <div className="dsa-result-score">
            <span className="score-value">{result.overall_score} / 100</span>
            <span className="score-label">Overall Score</span>
          </div>

          <div className="dsa-result-summary-stats">
            <span>{result.question_results.length} Questions</span>
            <span>{result.strong_count} Strong</span>
            <span>{result.needs_improvement_count} Need Improvement</span>
          </div>
        </div>

        {/* Overall AI Analysis */}
        <div className="dsa-result-section">
          <h3>Overall Performance</h3>
          <p>{result.overall_feedback}</p>
        </div>

        {/* Performance Breakdown */}
        <div className="dsa-result-section">
          <h3>Performance Breakdown</h3>
          <p className="dsa-result-note">AI-estimated performance indicators</p>

          {[
            { label: "Logic", value: breakdown.logic },
            { label: "Problem Solving", value: breakdown.problemSolving },
            { label: "Syntax", value: breakdown.syntax },
            { label: "Optimization", value: breakdown.optimization },
          ].map((row) => (
            <div className="breakdown-row" key={row.label}>
              <span className="breakdown-label">{row.label}</span>
              <div className="breakdown-bar-track">
                <div
                  className="breakdown-bar-fill"
                  style={{ width: `${row.value}%` }}
                />
              </div>
              <span className="breakdown-percent">{row.value}%</span>
            </div>
          ))}
        </div>

        {/* Weak Areas */}
        {result.weak_areas.length > 0 && (
          <div className="dsa-result-section">
            <h3>Areas to Improve</h3>
            {result.weak_areas.map((area, i) => (
              <div className="weak-area-item" key={i}>
                <p className="weak-area-title">⚠ {area.title}</p>
                <p className="weak-area-desc">{area.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Recommended Practice */}
        {result.recommendations.length > 0 && (
          <div className="dsa-result-section">
            <h3>Recommended Practice</h3>
            <ol className="recommendation-list">
              {result.recommendations.map((rec, i) => (
                <li key={i}>
                  <span className="recommendation-title">{rec.title}</span>
                  <p className="recommendation-detail">{rec.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Question-by-question */}
        <div className="dsa-result-section">
          <h3>Question-by-Question</h3>

          {result.question_results
            .sort((a, b) => a.questionNumber - b.questionNumber)
            .map((q) => (
              <div className="question-result-item" key={q.questionNumber}>
                <div className="question-result-header">
                  <span>
                    Question {q.questionNumber} — {q.title}
                  </span>
                  <span className="question-result-score">{q.score} / 10</span>
                </div>

                <p className="question-result-label">Your Answer</p>
                <pre className="question-result-answer">
                  {q.userAnswer || "(no answer submitted)"}
                </pre>

                <p className="question-result-label">AI Feedback</p>
                <p className="question-result-feedback">{q.feedback}</p>
              </div>
            ))}
        </div>

        {/* Bottom buttons */}
        <div className="dsa-result-actions">
          <button
            className="back-to-practice-btn"
            onClick={() => navigate("/dsa-practice")}
          >
            Back to DSA Practice
          </button>
        </div>

      </div>
    </main>
  );
}

export default DSAResult;