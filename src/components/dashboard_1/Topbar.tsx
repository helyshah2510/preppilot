import "./Topbar.css";
//import { Bell, CircleUserRound } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">

      <div className="topbar-left">
        <h2>Good Afternoon, Hely 👋</h2>
        <p>Let's continue your interview preparation.</p>
      </div>

      <div className="topbar-right">
        <button className="start-interview-btn">
          + Start Interview
        </button>
      </div>

    </header>
  );
}

export default Topbar;