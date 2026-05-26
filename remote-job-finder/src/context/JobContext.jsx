import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem("rjf_bookmarks");
    return stored ? JSON.parse(stored) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("rjf_dark");
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("rjf_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("rjf_dark", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleBookmark = (job) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.id === job.id);
      if (exists) return prev.filter((b) => b.id !== job.id);
      return [...prev, job];
    });
  };

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id);

  return (
    <JobContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, darkMode, setDarkMode }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);