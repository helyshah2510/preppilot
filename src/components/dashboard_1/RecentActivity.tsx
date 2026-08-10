import "./RecentActivity.css";

const activities = [
  {
    title: "React Mock Interview",
    date: "Yesterday, 6:40 PM",
    score: 88,
  },
  {
    title: "DSA — Arrays & Strings",
    date: "2 days ago, 8:15 PM",
    score: 61,
  },
  {
    title: "JavaScript Fundamentals",
    date: "3 days ago, 7:05 PM",
    score: 79,
  },
];

function RecentActivity() {
  return (
    <section className="recent-activity">

      <div className="recent-header">
        <h3>Recent Activity</h3>
        <p>Your latest practice sessions.</p>
      </div>

      <div className="activity-list">

        {activities.map((activity) => (
          <div className="activity-item" key={activity.title}>

            <div className="activity-icon">
              🎯
            </div>

            <div className="activity-info">
              <h4>{activity.title}</h4>
              <p>{activity.date}</p>
            </div>

            <span
              className={`activity-score ${
                activity.score < 70 ? "low-score" : ""
              }`}
            >
              {activity.score}%
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}

export default RecentActivity;