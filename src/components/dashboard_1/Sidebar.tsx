import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

function Sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      navigate("/");
    }
  };

  const displayName =
    typeof user?.user_metadata.full_name === "string" &&
    user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name
      : user?.email ?? "";

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

            <h4>{displayName}</h4>

          </div>

        </div>

        <button onClick={handleLogout}>

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
