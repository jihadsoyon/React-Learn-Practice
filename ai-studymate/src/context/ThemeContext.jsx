import { createContext, useContext, useState, useEffect } from 'react';
import { storage, KEYS } from '../utils/localStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => storage.get(KEYS.THEME) || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(KEYS.THEME, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);