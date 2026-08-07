import "./Sidebar.css";
import {
  LayoutDashboard,
  Mic,
  FileText,
  Code2,
  Route,
  ChartLine,
  Settings,
  LogOut,
  UserCircle2,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="logo">

          <span className="logo-icon">🚀</span>

          <h2>PrepPilot</h2>

        </div>

        <nav>

          <a href="#" className="active">
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a href="#">
            <Mic size={20} />
            Mock Interview
          </a>

          <a href="#">
            <FileText size={20} />
            Resume Analyzer
          </a>

          <a href="#">
            <Code2 size={20} />
            DSA Practice
          </a>

          <a href="#">
            <Route size={20} />
            Learning Roadmap
          </a>

          <a href="#">
            <ChartLine size={20} />
            Progress
          </a>

          <a href="#">
            <Settings size={20} />
            Settings
          </a>

        </nav>

      </div>

      <div className="sidebar-bottom">

        <div className="profile">

          <UserCircle2 size={38} />

          <div>

            <h4>Hely Shah</h4>

            <p>Student</p>

          </div>

        </div>

        <button>

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;