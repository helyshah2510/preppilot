import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ProgressChart.css";
import { supabase } from "../../lib/supabase";

interface ChartPoint {
  day: string;
  score: number | null;
}

function ProgressChart() {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const { data: sessions, error } = await supabase
        .from("activity_sessions")
        .select("score, created_at")
        .eq("user_id", user.id)
        .gte("created_at", sevenDaysAgo.toISOString());

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const days: ChartPoint[] = [];
      const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);

        const daySessions = (sessions ?? []).filter((s) => {
          const created = new Date(s.created_at);
          return created >= date && created < nextDate;
        });

        const avgScore =
          daySessions.length > 0
            ? Math.round(
                daySessions.reduce((sum, s) => sum + s.score, 0) /
                  daySessions.length
              )
            : null;

        days.push({ day: dayLabels[date.getDay()], score: avgScore });
      }

      setData(days);
      setLoading(false);
    };

    loadChartData();
  }, []);

  return (
    <div className="progress-chart-card">

      <div className="progress-chart-header">
        <div>
          <h3>Performance</h3>
          <p>Your session scores over the last 7 days.</p>
        </div>

        <span className="chart-period">Last 7 days</span>
      </div>

      <div className="chart-container">
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.06)"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  background: "#151A28",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#8B5CF6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}

export default ProgressChart;