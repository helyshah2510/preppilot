import { useEffect, useState } from "react";
import "./TopSkills.css";
import { supabase } from "../../lib/supabase";

interface Skill {
  name: string;
  score: number;
}

function TopSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: sessions, error } = await supabase
        .from("activity_sessions")
        .select("type, topic, score")
        .eq("user_id", user.id);

      if (error || !sessions) {
        console.error(error);
        setLoading(false);
        return;
      }

      const groups = new Map<string, { total: number; count: number }>();

      for (const session of sessions) {
        // All DSA topics roll up into one "DSA" skill; mock interview
        // topics (React, JavaScript, Technical, Behavioral) stay separate
        const key = session.type === "dsa" ? "DSA" : session.topic;

        const existing = groups.get(key) ?? { total: 0, count: 0 };
        existing.total += session.score;
        existing.count += 1;
        groups.set(key, existing);
      }

      const computed = Array.from(groups.entries())
        .map(([name, { total, count }]) => ({
          name,
          score: Math.round(total / count),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

      setSkills(computed);
      setLoading(false);
    };

    loadSkills();
  }, []);

  return (
    <div className="top-skills-card">

      <div className="top-skills-header">
        <h3>Top Skills</h3>
        <p>Your current skill performance.</p>
      </div>

      <div className="skills-list">

        {loading && <p>Loading skills...</p>}

        {!loading && skills.length === 0 && (
          <p>Complete a session to see your skill breakdown.</p>
        )}

        {!loading &&
          skills.map((skill) => (
            <div className="skill-item" key={skill.name}>
              <div className="skill-info">
                <span>{skill.name}</span>
                <span>{skill.score}%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: `${skill.score}%` }} />
              </div>
            </div>
          ))}

      </div>

    </div>
  );
}

export default TopSkills;