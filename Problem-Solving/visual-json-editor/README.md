# 🧩 Visual JSON Editor

A powerful, browser-based JSON editor built with React and Tailwind CSS. Edit complex nested JSON structures visually — no raw text editing required.

---

## 🔥 Problems This Solves

| Problem | How It's Solved |
|---|---|
| Editing nested JSON is error-prone | Visual tree UI — no manual bracket/comma management |
| Losing data between sessions | Auto-saves to `localStorage` on every change |
| Hard to understand JSON structure | Color-coded types + collapsible nodes |
| No quick way to share/export JSON | One-click Copy JSON button |
| Importing external JSON is tedious | Paste-and-import panel with validation |

---

## ✨ Features

- **🌳 Recursive Nested Editing** — Infinitely deep object/array support
- **➕ Add / ✕ Remove Fields** — At any depth, with inline forms
- **🔁 Type Switching** — Change any value's type on the fly (string → number → boolean → null → object → array)
- **📺 Live JSON Preview** — Syntax-highlighted, updates in real-time
- **📋 Copy JSON** — One-click clipboard export
- **📥 Import JSON** — Paste any JSON with validation error handling
- **💾 LocalStorage Persistence** — Your data survives page refresh
- **🔽 Collapse/Expand** — Fold nested nodes to reduce visual noise
- **⚠️ Error Handling** — Invalid keys, duplicate keys, bad import JSON all caught

---


## 📸 Screenshot

<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/fc0a5ecb-56cd-4e91-a45f-dac7c1147200" />

<img width="1917" height="715" alt="image" src="https://github.com/user-attachments/assets/b1eee534-9601-4be8-aaf6-55294a8d1c13" />

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React ** | Component-based UI, recursive rendering |
| **JavaScript (ES2022)** | Core logic, immutable state utilities |
| **Tailwind CSS ** | Utility-first styling, dark theme |
| **localStorage** | Client-side persistence, zero backend |
| **Vite** | Fast dev server and bundler |
