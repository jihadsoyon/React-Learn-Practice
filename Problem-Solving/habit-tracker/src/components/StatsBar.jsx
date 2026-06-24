// src/components/StatsBar.jsx

const StatsBar = ({ habits, getHabitStats }) => {
  const today = habits.filter((h) => getHabitStats(h).doneToday).length;
  const totalStreakDays = habits.reduce(
    (sum, h) => sum + getHabitStats(h).current,
    0
  );
  const bestOverall = habits.reduce(
    (max, h) => Math.max(max, getHabitStats(h).best),
    0
  );

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {[
        { label: "Done Today", value: `${today}/${habits.length}`, icon: "✅" },
        { label: "Total Streak Days", value: totalStreakDays, icon: "🔥" },
        { label: "Best Streak Ever", value: `${bestOverall}d`, icon: "🏆" },
      ].map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm"
        >
          <div className="text-2xl mb-1">{icon}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-white/50 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;