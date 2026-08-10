import "./TopSkills.css";

const skills = [
  { name: "React", score: 85 },
  { name: "JavaScript", score: 78 },
  { name: "TypeScript", score: 72 },
  { name: "DSA", score: 64 },
];

function TopSkills() {
  return (
    <div className="top-skills-card">

      <div className="top-skills-header">
        <h3>Top Skills</h3>
        <p>Your current skill performance.</p>
      </div>

      <div className="skills-list">

        {skills.map((skill) => (
          <div className="skill-item" key={skill.name}>

            <div className="skill-info">
              <span>{skill.name}</span>
              <span>{skill.score}%</span>
            </div>

            <div className="skill-bar">
              <div
                className="skill-progress"
                style={{ width: `${skill.score}%` }}
              />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TopSkills;