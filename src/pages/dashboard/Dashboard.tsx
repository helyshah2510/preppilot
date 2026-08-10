import Sidebar from "../../components/dashboard_1/Sidebar";
import Topbar from "../../components/dashboard_1/Topbar";
import StatsCards from "../../components/dashboard_1/StatsCards";
import ProgressChart from "../../components/dashboard_1/ProgressChart";
import TopSkills from "../../components/dashboard_1/TopSkills";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Topbar />

        <StatsCards />

        <section className="dashboard-progress">

          <ProgressChart />

          <TopSkills />

        </section>

      </div>

    </div>
  );
}

export default Dashboard;