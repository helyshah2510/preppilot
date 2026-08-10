import "./Progress.css"
import Sidebar from "../../components/dashboard_1/Sidebar"
import StatsCards from "../../components/dashboard_1/StatsCards"
import ProgressChart from "../../components/dashboard_1/ProgressChart"
import TopSkills from "../../components/dashboard_1/TopSkills"

function Progress(){
    return(
        <div className="progress-layout">
            <Sidebar/>
            <main className="progress-page">
                <h3>Progress</h3>
                <StatsCards/>
                <section className="progress-chart">

                    <ProgressChart />

                    <TopSkills />

                </section>
            </main>
        </div>
    );
}
export default Progress;