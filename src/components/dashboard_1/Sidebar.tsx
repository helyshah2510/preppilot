import "./Sidebar.css";
import { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

function Sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const [collapsed, setCollapsed] = useState(false);

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
    typeof user?.user_metadata?.full_name === "string" &&
    user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name
      : user?.email ?? "";

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Logo */}
      <div className="sidebar-top">

        <div className="logo">
          <span className="logo-icon">🚀</span>

          <h2>PrepPilot</h2>
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>

      </div>

      {/* Navigation */}
      <nav>

        <NavLink to="/dashboard"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
        title={collapsed ? "Dashboard" : ""}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/mock-interview"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
          title={collapsed ? "Mock Interview" : ""}
        >
          <Mic size={20} />
          <span>Mock Interview</span>
        </NavLink>

        <NavLink to="/resume-analyzer"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
          title={collapsed ? "Resume Analyzer" : ""}
        >
          <FileText size={20} />
          <span>Resume Analyzer</span>
        </NavLink>

        <NavLink to="/dsa-practice"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
          title={collapsed ? "DSA Practice" : ""}
        >
          <Code2 size={20} />
          <span>DSA Practice</span>
        </NavLink>

        <NavLink to="/learning-roadmap"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
          title={collapsed ? "Learning Roadmap" : ""}
        >
          <Route size={20} />
          <span>Learning Roadmap</span>
        </NavLink>

        <NavLink to="/progress"
         className={({ isActive }) =>
          isActive ? "active" : ""
        }
          title={collapsed ? "Progress" : ""}
        >
          <ChartLine size={20} />
          <span>Progress</span>
        </NavLink>

        <a
          href="#"
          title={collapsed ? "Settings" : ""}
        >
          <Settings size={20} />
          <span>Settings</span>
        </a>

      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <div className="profile">

          <UserCircle2 size={38} />

          <div className="profile-info">
            <h4>{displayName}</h4>
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;