// src/utils/dateUtils.js

export const getTodayKey = () => {
  return new Date().toISOString().split("T")[0]; // "2025-06-24"
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay(); // 0=Sun
};

export const calculateStreaks = (completedDates = []) => {
  if (!completedDates.length) return { current: 0, best: 0 };

  const sorted = [...completedDates].sort();
  const today = getTodayKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split("T")[0];

  let current = 0;
  let best = 0;
  let tempStreak = 1;

  // Calculate current streak
  const hasToday = sorted.includes(today);
  const hasYesterday = sorted.includes(yesterdayKey);

  if (hasToday || hasYesterday) {
    const startDate = hasToday ? today : yesterdayKey;
    let checkDate = new Date(startDate + "T00:00:00");

    while (true) {
      const key = checkDate.toISOString().split("T")[0];
      if (sorted.includes(key)) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate best streak
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + "T00:00:00");
    const curr = new Date(sorted[i] + "T00:00:00");
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      tempStreak++;
    } else {
      best = Math.max(best, tempStreak);
      tempStreak = 1;
    }
  }
  best = Math.max(best, tempStreak, current);

  return { current, best };
};