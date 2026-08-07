import "./Feature.css";

import {
  Bot,
  Mic,
  FileText,
  ChartColumn,
  Code2,
  Route,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Feedback",
    description:
      "Receive detailed AI feedback after every interview and improve continuously.",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    description:
      "Practice realistic technical and HR interviews with AI-powered simulations.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Optimize your resume with instant AI suggestions and recruiter insights.",
  },
  {
    icon: ChartColumn,
    title: "Progress Dashboard",
    description:
      "Track your interview performance with detailed analytics and reports.",
  },
  {
    icon: Code2,
    title: "DSA Practice",
    description:
      "Solve coding questions with explanations and improve problem-solving skills.",
  },
  {
    icon: Route,
    title: "Learning Roadmap",
    description:
      "Follow a personalized roadmap tailored to your interview goals.",
  },
];

function Features() {
  return (
    <section className="features">

      <div className="features-heading">

        <span>POWERFUL FEATURES</span>

        <h2>
          Everything You Need To
          <br />
          Ace Your Next Interview
        </h2>

        <p>
          One platform to prepare for coding interviews,
          HR rounds, resume building, and career growth.
        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div className="feature-card" key={index}>

              <div className="icon-box">
                <Icon size={28} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Features;