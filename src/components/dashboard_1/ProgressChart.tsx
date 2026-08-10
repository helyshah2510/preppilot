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

const data = [
  { day: "Mon", score: 68 },
  { day: "Tue", score: 74 },
  { day: "Wed", score: 71 },
  { day: "Thu", score: 82 },
  { day: "Fri", score: 78 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 82 },
];

function ProgressChart() {
  return (
    <div className="progress-chart-card">

      <div className="progress-chart-header">
        <div>
          <h3>Interview Performance</h3>
          <p>Your interview scores over the last 7 days.</p>
        </div>

        <span className="chart-period">Last 7 days</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
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
              dot={{
                r: 4,
                fill: "#8B5CF6",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ProgressChart;