import "./HowItWorks.css";
import { UserRound, Mic, Bot, Rocket } from "lucide-react";

function HowItWorks() {
  return (
    <section className="how-it-works">

      <div className="section-heading">
        <span>HOW IT WORKS</span>

        <h2>Crack Your Dream Job in 4 Simple Steps</h2>
      </div>

      <div className="timeline">

        <div className="timeline-line"></div>

        <div className="step">
          <div className="circle">
            <UserRound size={28} />
          </div>
          <h3>Create Profile</h3>
        </div>

        <div className="step">
          <div className="circle">
            <Mic size={28} />
          </div>
          <h3>Mock Interview</h3>
        </div>

        <div className="step">
          <div className="circle">
            <Bot size={28} />
          </div>
          <h3>AI Feedback</h3>
        </div>

        <div className="step">
          <div className="circle">
            <Rocket size={28} />
          </div>
          <h3>Get Hired</h3>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;