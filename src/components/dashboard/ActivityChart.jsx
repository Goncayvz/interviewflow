import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", solved: 12 },
  { day: "Tue", solved: 18 },
  { day: "Wed", solved: 9 },
  { day: "Thu", solved: 22 },
  { day: "Fri", solved: 16 },
  { day: "Sat", solved: 28 },
  { day: "Sun", solved: 20 },
];

function ActivityChart() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 h-[400px]">
      <h2 className="text-xl font-semibold mb-6">
        Weekly Activity
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="solved"
            stroke="#06b6d4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityChart;