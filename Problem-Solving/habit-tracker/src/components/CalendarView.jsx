// src/components/CalendarView.jsx
import { useState } from "react";
import { getDaysInMonth, getFirstDayOfMonth, formatDate } from "../utils/dateUtils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarView = ({ habit, onClose }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const totalDays = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const getKey = (d) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${viewYear}-${mm}-${dd}`;
  };

  const todayKey = today.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{habit.icon}</span>
          <div>
            <h3 className="text-white font-bold">{habit.name}</h3>
            <p className="text-white/40 text-xs">{habit.completedDates.length} total completions</p>
          </div>
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-white text-xl">✕</button>
        </div>

        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="text-white/50 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5">‹</button>
          <span className="text-white font-semibold text-sm">{monthLabel}</span>
          <button onClick={nextMonth} className="text-white/50 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5">›</button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-xs text-white/30 py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1;
            const key = getKey(day);
            const done = habit.completedDates.includes(key);
            const isToday = key === todayKey;
            const isFuture = key > todayKey;

            return (
              <div
                key={day}
                title={formatDate(key)}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition
                  ${done ? "text-white" : isFuture ? "text-white/15" : "text-white/30"}
                  ${isToday && !done ? "ring-1 ring-white/30" : ""}
                `}
                style={done ? { backgroundColor: habit.color + "cc" } : {}}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: habit.color }}></span>
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-white/10 inline-block ring-1 ring-white/30"></span>
            Today
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;