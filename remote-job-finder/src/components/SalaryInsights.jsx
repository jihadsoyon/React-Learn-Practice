import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { TrendingUp, DollarSign, BarChart2, Award } from "lucide-react";
import { fakeJobs } from "../data/fakeJobs";

const CATEGORY_COLORS = {
  Design: "#6366f1",
  Engineering: "#06b6d4",
  Product: "#f59e0b",
  Research: "#10b981",
  Marketing: "#ec4899",
  Data: "#8b5cf6",
};

const SalaryInsights = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Object.keys(CATEGORY_COLORS)];

  // Bar chart data — avg salary per category
  const barData = Object.entries(CATEGORY_COLORS).map(([cat, color]) => {
    const jobs = fakeJobs.filter((j) => j.category === cat);
    const avg =
      jobs.reduce((sum, j) => sum + (j.salary.min + j.salary.max) / 2, 0) /
      (jobs.length || 1);
    return { name: cat, avg: Math.round(avg / 1000), color, count: jobs.length };
  });

  // Filtered jobs
  const filtered =
    activeCategory === "All"
      ? fakeJobs
      : fakeJobs.filter((j) => j.category === activeCategory);

  // Salary range buckets
  const buckets = [
    { label: "$0–50k", min: 0, max: 50000 },
    { label: "$50–100k", min: 50000, max: 100000 },
    { label: "$100–150k", min: 100000, max: 150000 },
    { label: "$150–200k", min: 150000, max: 200000 },
    { label: "$200k+", min: 200000, max: Infinity },
  ];

  const distributionData = buckets.map((b) => ({
    label: b.label,
    count: filtered.filter((j) => j.salary.min >= b.min && j.salary.min < b.max)
      .length,
  }));

  // Stats
  const avgSalary =
    filtered.reduce((s, j) => s + (j.salary.min + j.salary.max) / 2, 0) /
    (filtered.length || 1);
  const maxJob = [...filtered].sort((a, b) => b.salary.max - a.salary.max)[0];
  const minJob = [...filtered].sort((a, b) => a.salary.min - b.salary.min)[0];

  // Radar data — location breakdown
  const locationData = ["Remote", "Hybrid", "On-site"].map((loc) => ({
    subject: loc,
    count: filtered.filter((j) => j.location === loc).length,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-dark-600 rounded-xl px-4 py-2 text-sm shadow-xl">
          <p className="text-white font-semibold">{label}</p>
          <p className="text-primary-400">
            {payload[0].name === "avg"
              ? `Avg: $${payload[0].value}k`
              : `${payload[0].value} jobs`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary-500/20 flex items-center justify-center">
          <BarChart2 size={20} className="text-primary-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-white">
            Salary Insights
          </h2>
          <p className="text-xs text-gray-400">
            Real-time salary data across {fakeJobs.length} remote jobs
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/30"
                : "bg-dark-700 text-gray-400 hover:bg-dark-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            icon: <DollarSign size={16} className="text-green-400" />,
            label: "Avg Salary",
            value: `$${Math.round(avgSalary / 1000)}k`,
            bg: "bg-green-500/10",
          },
          {
            icon: <TrendingUp size={16} className="text-cyan-400" />,
            label: "Highest",
            value: maxJob ? `$${Math.round(maxJob.salary.max / 1000)}k` : "—",
            bg: "bg-cyan-500/10",
          },
          {
            icon: <Award size={16} className="text-amber-400" />,
            label: "Most Jobs",
            value:
              barData.sort((a, b) => b.count - a.count)[0]?.name || "—",
            bg: "bg-amber-500/10",
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`${s.bg} rounded-2xl p-4 border border-white/5`}
          >
            <div className="flex items-center gap-2 mb-2">
              {s.icon}
              <span className="text-xs text-gray-400">{s.label}</span>
            </div>
            <p className="font-bold text-white text-lg">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Avg Salary by Category Bar Chart */}
      <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
        <p className="text-sm font-semibold text-white mb-4">
          Average Salary by Category
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={28}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
              {barData.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Salary Distribution */}
      <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
        <p className="text-sm font-semibold text-white mb-4">
          Salary Distribution — {activeCategory}
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={distributionData} barSize={32}>
            <XAxis
              dataKey="label"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#6366f1" fillOpacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Work Style Radar */}
      <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
        <p className="text-sm font-semibold text-white mb-4">
          Work Style Breakdown
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <RadarChart data={locationData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Radar
              dataKey="count"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryInsights;