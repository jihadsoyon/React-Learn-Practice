# 🎨 PixelBoard — Undo/Redo Drawing Board

## 🧩 What Problems Does This Project Solve?

| Problem | Solution |
|---|---|
| Complex state history management | Custom Undo/Redo stack using two arrays (past/future) |
| Persistent drawings across page reloads | LocalStorage integration with safe error handling |
| Continuous drawing while dragging | Mouse + Touch event tracking with last-cell deduplication |
| State explosion on redo after new action | Future stack clears automatically on new paint action |

---

## ✨ Features

- **🖱️ Click & Drag Painting** — Paint pixels by clicking or holding and dragging across the grid
- **↩️ Undo** — Step back through full paint history, one action at a time
- **↪️ Redo** — Re-apply undone actions; stack clears on new paint
- **🗑️ Clear Board** — Wipe the canvas (also undoable)
- **🎨 Color Palette** — 12 preset colors + full custom color picker
- **💾 LocalStorage Save** — Your drawing survives page refresh automatically
- **📱 Touch Support** — Works on mobile/tablet via touch events
- **📊 Stack Visualizer** — Live Undo/Redo count badges in the sidebar

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 (Vite) |
| State Management | Custom Hook (`useDrawingBoard`) — no Redux needed |
| Icons | Lucide React |
| Persistence | Browser LocalStorage |
| Styling | Pure CSS (CSS Variables, Grid, Flexbox) |
| Build Tool | Vite |



## 📸 Screenshot

<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/0b813a80-8cec-4d55-a519-4262dd0e8149" />

<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/fc4055f1-e6b4-4dcf-a666-cff6fbe614a7" />

