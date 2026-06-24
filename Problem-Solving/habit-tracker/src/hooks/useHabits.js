// src/hooks/useHabits.js
import { useState, useEffect } from "react";
import { getTodayKey, calculateStreaks } from "../utils/dateUtils";

const STORAGE_KEY = "habit_tracker_data";

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (habits) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
};

export const useHabits = () => {
  const [habits, setHabits] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(habits);
  }, [habits]);

  const addHabit = (name, color, icon) => {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      color,
      icon,
      completedDates: [],
      createdAt: getTodayKey(),
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const toggleToday = (id) => {
    const today = getTodayKey();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const already = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: already
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  const getHabitStats = (habit) => {
    const streaks = calculateStreaks(habit.completedDates);
    const today = getTodayKey();
    const doneToday = habit.completedDates.includes(today);
    return { ...streaks, doneToday };
  };

  return { habits, addHabit, deleteHabit, toggleToday, getHabitStats };
};