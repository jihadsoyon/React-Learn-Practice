// src/components/HabitCard.jsx
import { useState } from "react";
import CalendarView from "./CalendarView";

const HabitCard = ({ habit, stats, onToggle, onDelete }) => {
  const [showCal, setShowCal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const streakPercent = stats.best > 0 ? Math.min((stats.current / stats.best) * 100, 100) : 0;

  return (
    <>
      <div
        className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
        style={{ borderLeftColor: habit.color, borderLeftWidth: "3px" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: habit.color + "22" }}
            >
              {habit.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold leading-tight">{habit.name}</h3>
              <p className="text-white/40 text-xs mt-0.5">
                {habit.completedDates.length} day{habit.completedDates.length !== 1 ? "s" : ""} total
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCal(true)}
              className="opacity-0 group-hover:opacity-100 transition text-white/30 hover:text-white/70 text-sm px-2 py-1 rounded-lg hover:bg-white/5"
              title="View calendar"
            >
              📅
            </button>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="opacity-0 group-hover:opacity-100 transition text-white/30 hover:text-rose-400 text-sm px-2 py-1 rounded-lg hover:bg-white/5"
                title="Delete habit"
              >
                🗑
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button onClick={() => onDelete(habit.id)} className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 bg-rose-500/10 rounded-lg">Delete?</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-white/40 hover:text-white px-2 py-1 rounded-lg">No</button>
              </div>
            )}
          </div>
        </div>

        {/* Streak row */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{stats.current >= 3 ? "🔥" : "⚡"}</span>
            <span className="text-white font-bold text-lg">{stats.current}</span>
            <span className="text-white/40 text-xs">current</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🏆</span>
            <span className="text-white/70 font-semibold">{stats.best}</span>
            <span className="text-white/40 text-xs">best</span>
          </div>
          <div className="ml-auto">
            {stats.doneToday && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                ✓ Done
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${streakPercent}%`, backgroundColor: habit.color }}
          />
        </div>

        {/* Toggle button */}
        <button
          onClick={() => onToggle(habit.id)}
          className="w-full py-2.5 rounded-xl font-semibold text-sm transition active:scale-95"
          style={
            stats.doneToday
              ? { backgroundColor: habit.color + "33", color: habit.color, border: `1px solid ${habit.color}55` }
              : { backgroundColor: habit.color, color: "#fff" }
          }
        >
          {stats.doneToday ? "✓ Mark Incomplete" : "Mark Complete Today"}
        </button>
      </div>

      {showCal && <CalendarView habit={habit} onClose={() => setShowCal(false)} />}
    </>
  );
};

export default HabitCard;