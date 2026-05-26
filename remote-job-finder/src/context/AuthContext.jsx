import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("rjf_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem("rjf_users");
        const users = stored ? JSON.parse(stored) : [];
        const found = users.find((u) => u.email === email && u.password === password);
        if (found) {
          const userData = { id: found.id, name: found.name, email: found.email, avatar: found.avatar };
          setUser(userData);
          localStorage.setItem("rjf_user", JSON.stringify(userData));
          setLoading(false);
          resolve(userData);
        } else {
          setError("Invalid email or password");
          setLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem("rjf_users");
        const users = stored ? JSON.parse(stored) : [];
        if (users.find((u) => u.email === email)) {
          setError("Email already registered");
          setLoading(false);
          reject(new Error("Email exists"));
          return;
        }
        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };
        users.push(newUser);
        localStorage.setItem("rjf_users", JSON.stringify(users));
        const userData = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar };
        setUser(userData);
        localStorage.setItem("rjf_user", JSON.stringify(userData));
        setLoading(false);
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rjf_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);