import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useTimeline } from "../context/TimeLineContext";

const COLORS = { text: "#6366f1", call: "#22c55e", video: "#a855f7", meetup: "#f59e0b" };

export default function Stats() {
  const { timeline } = useTimeline();

  const counts = timeline.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Friendship Analytics</h1>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm font-semibold text-gray-600 mb-6">By Interaction Type</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || "#94a3b8"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}