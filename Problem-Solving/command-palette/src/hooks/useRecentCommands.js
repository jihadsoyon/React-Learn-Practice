import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cmd_palette_recent';
const MAX_RECENT = 5;

export function useRecentCommands() {
  const [recent, setRecent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecent = useCallback((commandId) => {
    setRecent(prev => {
      const filtered = prev.filter(id => id !== commandId);
      const updated = [commandId, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* quota exceeded etc */ }
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { recent, addRecent, clearRecent };
}