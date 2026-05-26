import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ActivityChart({ data }) {
  return (
    <div className="h-[340px] rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:h-[400px] sm:p-6">
      <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
        Solved by Category
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 35 }}>
          <XAxis
            dataKey="category"
            stroke="var(--chart-axis)"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12 }}
          />

          <Tooltip cursor={{ fill: "transparent" }} />

          <Bar
            dataKey="solved"
            fill="var(--chart-primary)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityChart;
