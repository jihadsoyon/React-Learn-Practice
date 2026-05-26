import { createContext, useContext, useState, useEffect } from 'react';
import { authStorage, progressStorage } from '../utils/localStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = authStorage.getUser();
    if (stored) setUser(stored);
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const result = authStorage.registerUser({ name, email, password });
    if (result.success) {
      const safeUser = { ...result.user };
      delete safeUser.password;
      authStorage.login(safeUser);
      progressStorage.update(safeUser.id, { topicsLearned: 0, notesCreated: 0, quizzesTaken: 0, streak: 1 });
      setUser(safeUser);
    }
    return result;
  };

  const login = (email, password) => {
    const result = authStorage.loginUser(email, password);
    if (result.success) setUser(result.user);
    return result;
  };

  const logout = () => {
    authStorage.logout();
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updated = authStorage.updateUser(updates);
    if (updated) setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};