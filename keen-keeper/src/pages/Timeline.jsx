import { useState } from "react";
import { Phone, MessageSquare, Video, Users, ChevronDown } from "lucide-react";
import { useTimeline } from "../context/TimeLineContext";

const typeConfig = {
  call: { icon: Phone, color: "text-green-600", bg: "bg-green-50" },
  text: { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
  video: { icon: Video, color: "text-purple-600", bg: "bg-purple-50" },
  meetup: { icon: Users, color: "text-yellow-600", bg: "bg-yellow-50" },
};

const filterOptions = ["All", "Call", "Text", "Video"];

export default function Timeline() {
  const { timeline } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? timeline
    : timeline.filter((e) => e.type === filter.toLowerCase());

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h1>

        {/* Filter Dropdown */}
        <div className="relative inline-block mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {filterOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Timeline Entries */}
        <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-10">No entries found.</p>
          )}
          {filtered.map((entry) => {
            const cfg = typeConfig[entry.type] || typeConfig.call;
            const Icon = cfg.icon;
            return (
              <div key={entry.id} className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <Icon size={16} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="capitalize">{entry.type}</span>{" "}
                    <span className="font-normal text-gray-600">with {entry.friendName}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap">{formatDate(entry.date)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}