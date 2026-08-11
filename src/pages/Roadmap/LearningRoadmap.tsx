import "./LearningRoadmap.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard_1/Sidebar";
import {
  Code2,
  Atom,
  Laptop,
  Users,
  Brain,
  ArrowRight,
} from "lucide-react";

function LearningRoadmap() {
  const navigate=useNavigate();
  const [currentFocus, setCurrentFocus] = useState<{
    topic: string;
    difficulty: string;
  } | null>(null);
  const [focusLoading, setFocusLoading] = useState(true);

  useEffect(() => {
    const loadCurrentFocus = async () => {
      setFocusLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFocusLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("dsa_results")
        .select("topic, difficulty, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(error);
        setFocusLoading(false);
        return;
      }

      if (data) {
        setCurrentFocus({ topic: data.topic, difficulty: data.difficulty });
      }

      setFocusLoading(false);
    };

    loadCurrentFocus();
  }, []);
  return (
    <div className="roadmap-layout">

      <Sidebar />

      <main className="roadmap-page">

        {/* Header */}

        <div className="roadmap-header">

          <div>
            <h1>Learning Roadmap</h1>

            <p>
              Follow your personalized path to become interview ready.
            </p>
          </div>

        </div>

        {/* Current Focus */}

        <section className="current-focus">

          <div className="focus-icon">
            <Brain size={24} />
          </div>

          <div className="focus-content">

            <span className="focus-label">
              CURRENT FOCUS
            </span>

            {!focusLoading && currentFocus ? (
              <>
                <h2>{currentFocus.topic} Practice</h2>

                <p>
                  Strengthen your {currentFocus.topic} concepts at{" "}
                  {currentFocus.difficulty} level and prepare for
                  technical interview questions.
                </p>
              </>
            ) : (
              <>
                <h2>React Interview Preparation</h2>

                <p>
                  Strengthen your React concepts and prepare for
                  technical interview questions.
                </p>
              </>
            )}

            <div className="focus-progress-row">

              <div className="focus-progress">
                <span style={{ width: "65%" }}></span>
              </div>

            </div>

          </div>

          <button
            className="focus-btn"
            onClick={() => navigate("/dsa-practice")}
          >
            Continue
            <ArrowRight size={17} />
          </button>

        </section>


        {/* Preparation Tracks */}

        <section className="tracks-section">

          <div className="section-heading">

            <h2>Preparation Tracks</h2>

            <p>
              Improve your skills through focused interview preparation.
            </p>

          </div>


          <div className="roadmap-tracks">


            {/* JavaScript */}

            <div className="roadmap-track-card">

              <div className="track-icon javascript-icon">
                <Code2 size={25} />
              </div>

              <div className="track-header">

                <div>
                  <h3>JavaScript</h3>
                  <span>Interview Prep</span>
                </div>

              </div>

              <p className="track-description">
                Prepare for JavaScript fundamentals, ES6+,
                async programming and advanced concepts.
              </p>

              <div className="track-progress">
                <span style={{ width: "75%" }}></span>
              </div>

              <div className="track-footer">

                <button onClick={()=> navigate(`/mock-interview`)}>
                  Continue
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>


            {/* React */}

            <div className="roadmap-track-card active-track">

              <div className="track-icon react-icon">
                <Atom size={25} />
              </div>

              <div className="track-header">

                <div>
                  <h3>React</h3>
                  <span>Interview Prep</span>
                </div>

              </div>

              <p className="track-description">
                Practice components, hooks, state management,
                performance and advanced React concepts.
              </p>

              <div className="track-progress">
                <span style={{ width: "65%" }}></span>
              </div>

              <div className="track-footer">

                <button onClick={()=> navigate(`/mock-interview`)}>
                  Continue
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>


            {/* Technical */}

            <div className="roadmap-track-card">

              <div className="track-icon technical-icon">
                <Laptop size={25} />
              </div>

              <div className="track-header">

                <div>
                  <h3>Technical</h3>
                  <span>Interview</span>
                </div>

              </div>

              <p className="track-description">
                Test your technical knowledge with
                real-world concepts and problem solving.
              </p>

              <div className="track-progress">
                <span style={{ width: "40%" }}></span>
              </div>

              <div className="track-footer">

                <button onClick={()=> navigate(`/mock-interview`)}>
                  Continue
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>


            {/* Behavioral */}

            <div className="roadmap-track-card">

              <div className="track-icon behavioral-icon">
                <Users size={25} />
              </div>

              <div className="track-header">

                <div>
                  <h3>Behavioral</h3>
                  <span>Interview</span>
                </div>

              </div>

              <p className="track-description">
                Improve your communication and prepare for
                common HR and behavioral questions.
              </p>

              <div className="track-progress">
                <span style={{ width: "55%" }}></span>
              </div>

              <div className="track-footer">

                <button onClick={()=> navigate(`/mock-interview`)}>
                  Continue
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>


            {/* DSA */}

            <div className="roadmap-track-card">

              <div className="track-icon dsa-icon">
                <Code2 size={25} />
              </div>

              <div className="track-header">

                <div>
                  <h3>DSA Practice</h3>
                  <span>Problem Solving</span>
                </div>

              </div>

              <p className="track-description">
                Practice data structures and algorithms
                through coding problems.
              </p>

              <div className="track-progress">
                <span style={{ width: "50%" }}></span>
              </div>

              <div className="track-footer">

                <button onClick={()=> navigate(`/dsa-practice`)}>
                  Practice
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>


          </div>

        </section>

      </main>

    </div>
  );
}

export default LearningRoadmap;