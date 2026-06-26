# 🔥 Habit Tracker with Streak System

A production-quality habit tracking app with streak calculations, calendar heatmap view, and full LocalStorage persistence — built to demonstrate real-world business logic in React.

---

## 🧩 Problem Statement

Most people fail to build habits because they have no visual accountability system. This app solves that by giving users a daily check-in mechanism with streak tracking, so they can see progress, maintain momentum, and visualize consistency over time — entirely offline with no backend required.

---

## ✨ Features

- **Add Daily Habits** — Create habits with a custom name, icon (emoji picker), and color label
- **Mark Complete / Incomplete** — Toggle today's completion with a single tap
- **Current Streak** — Automatically calculates how many consecutive days a habit has been completed
- **Best Streak** — Tracks the longest streak ever achieved per habit
- **Calendar View** — Full monthly heatmap showing every completion date with month navigation
- **Stats Dashboard** — Overview bar showing daily completion rate, total streak days, and best streak across all habits
- **Filter Tabs** — Filter habits by All / Done Today / Pending
- **Soft Delete with Confirmation** — Two-step delete to prevent accidental removal
- **LocalStorage Persistence** — All data survives page refresh and browser close, zero backend
- **Responsive UI** — Works cleanly on mobile and desktop

---

## 🛠 Tech Stack

| Technology | Version | Usage |
|---|---|---|
| React | 19.2 | UI components, hooks, state management |
| JavaScript (ES2024) | — | Business logic, date calculations |
| Tailwind CSS | v4.3 | Utility-first styling, dark theme |
| Vite | Latest | Dev server, build tool |
| LocalStorage | Browser API | Client-side data persistence |

---

## 📁 Project Structure

```
habit-tracker/
├── src/
│   ├── components/
│   │   ├── HabitForm.jsx       # Modal form for adding new habits
│   │   ├── HabitCard.jsx       # Per-habit card with streaks + toggle
│   │   ├── CalendarView.jsx    # Monthly calendar heatmap modal
│   │   └── StatsBar.jsx        # Top-level stats overview
│   ├── hooks/
│   │   └── useHabits.js        # Custom hook: CRUD + LocalStorage sync
│   ├── utils/
│   │   └── dateUtils.js        # Date math: streaks, month grids, keys
│   ├── App.jsx                 # Root layout, routing between views
│   ├── main.jsx                # React 19 entry point
│   └── index.css               # Tailwind v4 import
├── vite.config.js
└── README.md
```

---
## 📸 Screenshot

<img width="1919" height="786" alt="image" src="https://github.com/user-attachments/assets/beaaa897-950d-4021-8084-e081c408b805" />
<img width="1919" height="808" alt="image" src="https://github.com/user-attachments/assets/2bd44050-ebde-49a3-9bbd-b414d662599c" />
<img width="1919" height="833" alt="image" src="https://github.com/user-attachments/assets/5a98b6cb-1e0e-4590-aef1-d52348b932f6" />
<img width="1919" height="799" alt="image" src="https://github.com/user-attachments/assets/7ea63633-d850-40e9-b445-76777e73140c" />
<img width="1919" height="742" alt="image" src="https://github.com/user-attachments/assets/3a19bd09-312b-4b96-8c35-c35fcb362409" />
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/0f846d0d-28cd-40cb-8e2e-255dc2d7abef" />

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/jihadsoyon/React-Learn-Practice.git
cd React-Learn-Practice/Problem-Solving/habit-tracker

# 2. Install dependencies
npm install

# 4. Start development server
npm run dev
```

---

*Built with React 19 + Vite + Tailwind CSS v4 — no backend, no dependencies beyond the framework.*
