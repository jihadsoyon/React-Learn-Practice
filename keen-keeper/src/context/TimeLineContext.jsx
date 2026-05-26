import { createContext, useContext, useState, useEffect } from "react";

const TimelineContext = createContext();

const STORAGE_KEY = "keenkeeper_timeline";



export function TimelineProvider({ children }) {
  const [timeline, setTimeline] = useState(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timeline));
  }, [timeline]);

  const addEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      ...entry,
    };
    setTimeline((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ timeline, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}