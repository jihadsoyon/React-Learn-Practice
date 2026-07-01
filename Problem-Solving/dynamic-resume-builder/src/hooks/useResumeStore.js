import { useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/localStorage";

const DEFAULT_RESUME = {
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  sectionOrder: ["personal", "experience", "education", "projects", "skills"],
};

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export function useResumeStore() {
  const [resume, setResume] = useState(() => {
    const saved = loadFromStorage();
    return saved ? { ...DEFAULT_RESUME, ...saved } : DEFAULT_RESUME;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveToStorage(resume);
  }, [resume]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Personal
  const updatePersonal = (field, value) => {
    setResume((r) => ({ ...r, personal: { ...r.personal, [field]: value } }));
  };

  // Generic CRUD for array sections
  const addItem = (section, template) => {
    const item = { id: generateId(), ...template };
    setResume((r) => ({ ...r, [section]: [...r[section], item] }));
    showToast(`Added to ${section}`);
    return item.id;
  };

  const updateItem = (section, id, field, value) => {
    setResume((r) => ({
      ...r,
      [section]: r[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeItem = (section, id) => {
    setResume((r) => ({
      ...r,
      [section]: r[section].filter((item) => item.id !== id),
    }));
    showToast(`Removed from ${section}`, "error");
  };

  // Reorder sections (drag & drop)
  const reorderSections = (fromIndex, toIndex) => {
    setResume((r) => {
      const order = [...r.sectionOrder];
      const [moved] = order.splice(fromIndex, 1);
      order.splice(toIndex, 0, moved);
      return { ...r, sectionOrder: order };
    });
  };

  // Reorder items within a section
  const reorderItems = (section, fromIndex, toIndex) => {
    setResume((r) => {
      const items = [...r[section]];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...r, [section]: items };
    });
  };

  const resetResume = () => {
    setResume(DEFAULT_RESUME);
    showToast("Resume cleared", "error");
  };

  return {
    resume,
    toast,
    updatePersonal,
    addItem,
    updateItem,
    removeItem,
    reorderSections,
    reorderItems,
    resetResume,
    showToast,
  };
}