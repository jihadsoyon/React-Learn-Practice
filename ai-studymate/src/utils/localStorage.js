// ============================================
// LocalStorage Utility - Backend Replacement
// ============================================

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};

// Keys
export const KEYS = {
  USER: 'studymate_user',
  USERS_DB: 'studymate_users_db',
  NOTES: 'studymate_notes',
  CHAT_HISTORY: 'studymate_chat_history',
  QUIZZES: 'studymate_quizzes',
  PROGRESS: 'studymate_progress',
  BOOKMARKS: 'studymate_bookmarks',
  SETTINGS: 'studymate_settings',
  THEME: 'studymate_theme',
};

// Auth helpers
export const authStorage = {
  login: (user) => storage.set(KEYS.USER, user),
  logout: () => storage.remove(KEYS.USER),
  getUser: () => storage.get(KEYS.USER),
  isLoggedIn: () => !!storage.get(KEYS.USER),
  registerUser: (userData) => {
    const db = storage.get(KEYS.USERS_DB) || [];
    const exists = db.find((u) => u.email === userData.email);
    if (exists) return { success: false, message: 'Email already registered' };
    const newUser = { ...userData, id: Date.now(), createdAt: new Date().toISOString() };
    db.push(newUser);
    storage.set(KEYS.USERS_DB, db);
    return { success: true, user: newUser };
  },
  loginUser: (email, password) => {
    const db = storage.get(KEYS.USERS_DB) || [];
    const user = db.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password' };
    const safeUser = { ...user };
    delete safeUser.password;
    storage.set(KEYS.USER, safeUser);
    return { success: true, user: safeUser };
  },
  updateUser: (updates) => {
    const current = storage.get(KEYS.USER);
    if (!current) return false;
    const updated = { ...current, ...updates };
    storage.set(KEYS.USER, updated);
    // also update in db
    const db = storage.get(KEYS.USERS_DB) || [];
    const idx = db.findIndex((u) => u.id === current.id);
    if (idx !== -1) {
      db[idx] = { ...db[idx], ...updates };
      storage.set(KEYS.USERS_DB, db);
    }
    return updated;
  },
};

// Notes helpers
export const notesStorage = {
  getAll: (userId) => {
    const all = storage.get(KEYS.NOTES) || {};
    return all[userId] || [];
  },
  save: (userId, note) => {
    const all = storage.get(KEYS.NOTES) || {};
    const userNotes = all[userId] || [];
    const existing = userNotes.findIndex((n) => n.id === note.id);
    if (existing !== -1) userNotes[existing] = note;
    else userNotes.unshift({ ...note, id: Date.now(), createdAt: new Date().toISOString() });
    all[userId] = userNotes;
    storage.set(KEYS.NOTES, all);
    return userNotes;
  },
  delete: (userId, noteId) => {
    const all = storage.get(KEYS.NOTES) || {};
    const userNotes = (all[userId] || []).filter((n) => n.id !== noteId);
    all[userId] = userNotes;
    storage.set(KEYS.NOTES, all);
    return userNotes;
  },
};

// Chat helpers
export const chatStorage = {
  getHistory: (userId) => {
    const all = storage.get(KEYS.CHAT_HISTORY) || {};
    return all[userId] || [];
  },
  addMessage: (userId, message) => {
    const all = storage.get(KEYS.CHAT_HISTORY) || {};
    const history = all[userId] || [];
    history.push({ ...message, timestamp: new Date().toISOString() });
    all[userId] = history.slice(-100); // keep last 100
    storage.set(KEYS.CHAT_HISTORY, all);
    return all[userId];
  },
  clearHistory: (userId) => {
    const all = storage.get(KEYS.CHAT_HISTORY) || {};
    all[userId] = [];
    storage.set(KEYS.CHAT_HISTORY, all);
  },
};

// Progress helpers
export const progressStorage = {
  get: (userId) => {
    const all = storage.get(KEYS.PROGRESS) || {};
    return all[userId] || { topicsLearned: 0, notesCreated: 0, quizzesTaken: 0, streak: 0, lastActive: null };
  },
  update: (userId, updates) => {
    const all = storage.get(KEYS.PROGRESS) || {};
    const current = all[userId] || {};
    all[userId] = { ...current, ...updates, lastUpdated: new Date().toISOString() };
    storage.set(KEYS.PROGRESS, all);
    return all[userId];
  },
  incrementStat: (userId, stat) => {
    const all = storage.get(KEYS.PROGRESS) || {};
    const current = all[userId] || { topicsLearned: 0, notesCreated: 0, quizzesTaken: 0, streak: 1 };
    current[stat] = (current[stat] || 0) + 1;
    all[userId] = current;
    storage.set(KEYS.PROGRESS, all);
    return all[userId];
  },
};