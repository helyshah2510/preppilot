import "./StatsCards.css";

function StatsCards() {
  return (
    <section className="stats-grid">

      <div className="stat-card">
        <p className="stat-label">Overall Score</p>
        <h2>82%</h2>
        <span className="stat-positive">+12% this week</span>
      </div>

      <div className="stat-card">
        <p className="stat-label">Interviews</p>
        <h2>24</h2>
        <span className="stat-positive">+3 this week</span>
      </div>

      <div className="stat-card">
        <p className="stat-label">Hours Practiced</p>
        <h2>14.5</h2>
        <span className="stat-positive">+2.1 this week</span>
      </div>

      <div className="stat-card">
        <p className="stat-label">Current Streak</p>
        <h2>5 Days</h2>
        <span className="stat-streak">🔥 Keep it up</span>
      </div>

    </section>
  );
}

export default StatsCards;