import { useEffect, useState } from "react";
import "./StatsCards.css";
import { supabase } from "../../lib/supabase";

interface StatsData {
  overallScore: number;
  scoreTrend: number | null;
  sessionsCompleted: number;
  sessionsThisWeek: number;
  streakDays: number;
}

function StatsCards() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
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
        .select("score, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error || !sessions) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (sessions.length === 0) {
        setStats({
          overallScore: 0,
          scoreTrend: null,
          sessionsCompleted: 0,
          sessionsThisWeek: 0,
          streakDays: 0,
        });
        setLoading(false);
        return;
      }

      const overallScore = Math.round(
        sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length
      );

      const now = new Date();
      const startOfThisWeek = new Date(now);
      startOfThisWeek.setDate(now.getDate() - 7);

      const startOfLastWeek = new Date(now);
      startOfLastWeek.setDate(now.getDate() - 14);

      const thisWeekSessions = sessions.filter(
        (s) => new Date(s.created_at) >= startOfThisWeek
      );
      const lastWeekSessions = sessions.filter(
        (s) =>
          new Date(s.created_at) >= startOfLastWeek &&
          new Date(s.created_at) < startOfThisWeek
      );

      let scoreTrend: number | null = null;
      if (thisWeekSessions.length > 0 && lastWeekSessions.length > 0) {
        const thisWeekAvg =
          thisWeekSessions.reduce((sum, s) => sum + s.score, 0) /
          thisWeekSessions.length;
        const lastWeekAvg =
          lastWeekSessions.reduce((sum, s) => sum + s.score, 0) /
          lastWeekSessions.length;
        scoreTrend = Math.round(thisWeekAvg - lastWeekAvg);
      }

      const uniqueDates = Array.from(
        new Set(sessions.map((s) => new Date(s.created_at).toDateString()))
      ).map((d) => new Date(d));

      uniqueDates.sort((a, b) => b.getTime() - a.getTime());

      let streakDays = 0;
      const cursor = new Date();
      cursor.setHours(0, 0, 0, 0);

      for (const date of uniqueDates) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        if (d.getTime() === cursor.getTime()) {
          streakDays++;
          cursor.setDate(cursor.getDate() - 1);
        } else if (d.getTime() < cursor.getTime()) {
          break;
        }
      }

      setStats({
        overallScore,
        scoreTrend,
        sessionsCompleted: sessions.length,
        sessionsThisWeek: thisWeekSessions.length,
        streakDays,
      });

      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading || !stats) {
    return (
      <section className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Overall Score</p>
          <h2>--</h2>
        </div>
        <div className="stat-card">
          <p className="stat-label">Sessions Completed</p>
          <h2>--</h2>
        </div>
        <div className="stat-card">
          <p className="stat-label">Hours Practiced</p>
          <h2>--</h2>
        </div>
        <div className="stat-card">
          <p className="stat-label">Current Streak</p>
          <h2>--</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="stats-grid">

      <div className="stat-card">
        <p className="stat-label">Overall Score</p>
        <h2>{stats.overallScore}%</h2>
        {stats.scoreTrend !== null && (
          <span className={stats.scoreTrend >= 0 ? "stat-positive" : "stat-negative"}>
            {stats.scoreTrend >= 0 ? "+" : ""}
            {stats.scoreTrend}% this week
          </span>
        )}
      </div>

      <div className="stat-card">
        <p className="stat-label">Sessions Completed</p>
        <h2>{stats.sessionsCompleted}</h2>
        <span className="stat-positive">+{stats.sessionsThisWeek} this week</span>
      </div>

      <div className="stat-card">
        <p className="stat-label">Hours Practiced</p>
        <h2>14.5</h2>
        <span className="stat-positive">+2.1 this week</span>
      </div>

      <div className="stat-card">
        <p className="stat-label">Current Streak</p>
        <h2>{stats.streakDays} Days</h2>
        <span className="stat-streak">🔥 Keep it up</span>
      </div>

    </section>
  );
}

export default StatsCards;