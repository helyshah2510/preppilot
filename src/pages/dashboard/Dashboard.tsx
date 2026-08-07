import Sidebar from "../../components/dashboard_1/Sidebar";
import Topbar from "../../components/dashboard_1/Topbar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />
        <main className="dashboard-content">
        </main>
      </div>
    </div>
  );
}

export default Dashboard;