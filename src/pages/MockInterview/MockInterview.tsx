import "./MockInterview.css";
import Sidebar from "../../components/dashboard_1/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  Laptop,
  Users,
  Atom,
  FileCode2,
  ArrowRight,
} from "lucide-react";

function MockInterview() {
  const navigate=useNavigate();
  return (
    <div className="mock-interview-layout">

      <Sidebar />

      <main className="mock-interview-page">

        <div className="mock-header">
          <div>
            <h1>Mock Interview</h1>

            <p>
              Practice real interview questions and get AI-powered feedback.
            </p>
          </div>
        </div>

        <div className="interview-heading">
          <h2>Choose your interview type</h2>
          <p>Select a category to get started</p>
        </div>

        <div className="interview-grid">

          <div className="interview-card">
            <div className="interview-icon technical">
              <Laptop size={30} />
            </div>

            <div className="interview-card-content">
              <h3>Technical Interview</h3>

              <p>
                Test your technical skills with real-world coding
                and conceptual questions.
              </p>

              <button onClick={()=>navigate("/mock-interview/session?type=Technical")}>
                Start Interview
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="interview-card">
            <div className="interview-icon behavioral">
              <Users size={30} />
            </div>

            <div className="interview-card-content">
              <h3>Behavioral Interview</h3>

              <p>
                Practice common HR questions and improve your
                communication skills.
              </p>

              <button onClick={()=>navigate("/mock-interview/session?type=Behavioral")}>
                Start Interview
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="interview-card">
            <div className="interview-icon react">
              <Atom size={30} />
            </div>

            <div className="interview-card-content">
              <h3>React Interview</h3>

              <p>
                React-specific questions including hooks,
                components, state management and more.
              </p>

              <button onClick={()=>navigate("/mock-interview/session?type=React")}>
                Start Interview
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="interview-card">
            <div className="interview-icon javascript">
              <FileCode2 size={30} />
            </div>

            <div className="interview-card-content">
              <h3>JavaScript Interview</h3>

              <p>
                JavaScript fundamentals, ES6+, DOM, async
                programming and advanced concepts.
              </p>

              <button onClick={()=>navigate("/mock-interview/session?type=JavaScript")}>
                Start Interview
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

export default MockInterview;