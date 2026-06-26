# 🗂️ Folder Explorer — VS Code Style

A pixel-perfect VS Code-inspired file explorer built with React 19, Tailwind CSS v4, and localStorage. Demonstrates recursive component architecture, tree data structure manipulation, and real-world state management patterns.

---

## 🧩 Problems This Project Solves

| Problem | How |
|---|---|
| How do you render arbitrarily deep nested data? | Recursive `TreeNode` component calls itself for every child |
| How do you manage complex tree state (add/delete/rename)? | Pure recursive utility functions with immutable updates |
| How do you persist UI state across sessions? | `localStorage` sync on every tree mutation |
| How do you handle inline editing UX? | Auto-focus rename input with keyboard (Enter/Escape) support |

---

## ✨ Features

- 📁 **Nested folders & files** — unlimited depth, real tree structure
- ▶️ **Expand / Collapse** — animated chevron, per-node state persisted
- ➕ **Add file or folder** — anywhere in the tree, instantly renames
- ✏️ **Rename** — double-click or toolbar button, keyboard shortcuts
- 🗑️ **Delete** — with hover-reveal action buttons
- 💾 **localStorage persistence** — tree survives page refresh
- 🎨 **File type color coding** — JSX, TS, CSS, JSON, MD, images
- 🖥️ **VS Code layout** — activity bar, sidebar, tab bar, status bar, mock editor
- 🔄 **Reset to default** — one-click restore

---

## 📸 Screenshots

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a67f082a-d808-42cc-a8e1-808bb90520d6" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/58635087-a0b3-4188-9366-001eeaae7f48" />


| Tool | Version |
|---|---|
| React | 19.2 |
| Vite | Latest |
| Tailwind CSS | v4.3 |
| JavaScript | ES2024 |
| localStorage | Browser API |

---

## 🛠️ Tech Stack



## 🚀 Run Locally

```bash
npm create vite@latest folder-explorer -- --template react
cd folder-explorer
npm install
npm install tailwindcss @tailwindcss/vite
npm run dev
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/jihadsoyon/React-Learn-Practice.git
cd React-Learn-Practice/Problem-Solving/folder-explorer

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

## 🧠 Recruiter Highlights

- **Recursive components** — `TreeNode` renders itself: the core CS concept
- **Immutable tree operations** — add/delete/rename without mutation
- **Custom hook** — `useFileTree` encapsulates all business logic
- **Auto-focus UX** — new nodes immediately enter rename mode
- **Zero dependencies** beyond React + Tailwind
