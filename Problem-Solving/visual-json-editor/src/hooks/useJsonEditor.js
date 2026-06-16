import { useState, useEffect, useCallback } from "react";
import {
  setByPath,
  deleteByPath,
  addByPath,
  deepClone,
} from "../utils/jsonHelpers";

const STORAGE_KEY = "vje_json_data";

const DEFAULT_JSON = {
  name: "Alice",
  age: 28,
  isActive: true,
  address: {
    city: "Dhaka",
    zip: "1207",
  },
  tags: ["react", "json", "dev"],
};

export const useJsonEditor = () => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_JSON;
    } catch {
      return DEFAULT_JSON;
    }
  });

  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setError(null);
    } catch (e) {
      setError("Failed to save to localStorage.");
    }
  }, [data]);

  const updateValue = useCallback((path, value) => {
    setData((prev) => setByPath(prev, path, value));
  }, []);

  const deleteNode = useCallback((path) => {
    setData((prev) => deleteByPath(prev, path));
  }, []);

  const addNode = useCallback((path, key, value) => {
    setData((prev) => addByPath(prev, path, key, value));
  }, []);

  const resetData = useCallback(() => {
    setData(DEFAULT_JSON);
  }, []);

  const importJson = useCallback((raw) => {
    try {
      const parsed = JSON.parse(raw);
      setData(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON — could not import.");
    }
  }, []);

  const copyJson = useCallback(() => {
    const str = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(str).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [data]);

  return {
    data,
    error,
    copied,
    updateValue,
    deleteNode,
    addNode,
    resetData,
    importJson,
    copyJson,
  };
};