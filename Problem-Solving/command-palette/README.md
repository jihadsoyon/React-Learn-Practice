# ⌨️ Command Palette

> VS Code / Notion-style command palette — fuzzy search, keyboard navigation, recent history, fully accessible.

---

## 🧩 Problems This Project Solves

| Problem | Solution |
|---|---|
| Mouse-heavy workflows slow users down | `Ctrl+K` opens palette from anywhere instantly |
| Hard to discover available actions | All commands searchable in one place |
| Repetitive navigation to find commands | Recent commands remembered via Local Storage |
| Poor accessibility in custom UIs | Full ARIA roles, keyboard-only navigable |
| Slow exact-match search UX | Fuzzy search with scored ranking & highlights |

---

## ✨ Features

- **`Ctrl + K`** — Global shortcut opens/closes palette from anywhere
- **Fuzzy Search** — Typo-tolerant, scored, character-level matching with highlighted results
- **Keyboard Navigation** — `↑↓` to move, `Enter` to execute, `Escape` to close
- **Recent Commands** — Last 5 executed commands shown first, persisted across sessions
- **Clear History** — One-click clear recent commands
- **Category Badges** — Color-coded categories (File, Git, Code, Settings, etc.)
- **Keyboard Shortcut Hints** — Native shortcuts shown per command (`Ctrl+S`, `Ctrl+,` etc.)
- **ARIA Accessible** — `role="dialog"`, `role="listbox"`, `aria-selected`, `aria-activedescendant`
- **Smooth Animation** — Scale + fade entrance animation
- **Click Outside to Close** — Overlay click dismisses palette
- **Empty State** — Friendly UI when no results match

---

## 📸 Screenshots
<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/46fa7432-dbe7-4af2-84d5-b8b370b15b45" />
<img width="1919" height="894" alt="image" src="https://github.com/user-attachments/assets/0f08f65c-5d5a-4843-9389-d438a08256b3" />




## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2 | UI components, hooks, state |
| **JavaScript** | ES2024 | Logic, fuzzy search algorithm |
| **Tailwind CSS** | v4.3 | Utility-first styling, glass morphism |
| **Vite** | Latest | Dev server & build tool |
| **Local Storage** | Browser API | Persist recent command history |
| **lucide-react** | Latest | Icon set |
