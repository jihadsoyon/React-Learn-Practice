// src/App.jsx
import { useState } from "react";
import { useHabits } from "./hooks/useHabits";
import HabitCard from "./components/HabitCard";
import HabitForm from "./components/HabitForm";
import StatsBar from "./components/StatsBar";

const FILTERS = ["All", "Done", "Pending"];

export default function App() {
  const { habits, addHabit, deleteHabit, toggleToday, getHabitStats } = useHabits();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const filtered = habits.filter((h) => {
    const { doneToday } = getHabitStats(h);
    if (filter === "Done") return doneToday;
    if (filter === "Pending") return !doneToday;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Habit Tracker
            </h1>
            <p className="text-white/40 text-sm mt-1">{today}</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition active:scale-95 shadow-lg shadow-violet-900/40"
          >
            <span className="text-lg leading-none">+</span> New Habit
          </button>
        </div>

        {/* Stats */}
        {habits.length > 0 && (
          <StatsBar habits={habits} getHabitStats={getHabitStats} />
        )}

        {/* Filter tabs */}
        {habits.length > 0 && (
          <div className="flex gap-2 mb-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === f
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Habit list */}
        {filtered.length > 0 ? (
          <div className="grid gap-3">
            {filtered.map((h) => (
              <HabitCard
                key={h.id}
                habit={h}
                stats={getHabitStats(h)}
                onToggle={toggleToday}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        ) : habits.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-white/60 text-xl font-semibold mb-2">No habits yet</h2>
            <p className="text-white/30 text-sm mb-6">Start building your streak today.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Add Your First Habit
            </button>
          </div>
        ) : (
          <div className="text-center py-12 text-white/30">
            No habits match this filter.
          </div>
        )}
      </div>

      {showForm && (
        <HabitForm onAdd={addHabit} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}