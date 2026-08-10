import "./Topbar.css";
import { useNavigate} from "react-router-dom";
//import { Bell, CircleUserRound } from "lucide-react";

function Topbar() {
  const navigate=useNavigate();
  return (
    <header className="topbar">

      <div className="topbar-left">
        <h2>Good Afternoon, Hely 👋</h2>
        <p>Let's continue your interview preparation.</p>
      </div>

      <div className="topbar-right">
        <button className="start-interview-btn"
        onClick={()=> navigate("/mock-interview")}>
          + Start Interview
        </button>
      </div>

    </header>
  );
}

export default Topbar;