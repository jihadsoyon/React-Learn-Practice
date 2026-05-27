# 🎓 AI StudyMate

> An AI-powered all-in-one learning platform for modern students.

![AI StudyMate](https://img.shields.io/badge/React-19-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-teal?logo=tailwindcss) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Link
🔗 https://ai-studypartnar.netlify.app/

> To deploy: `npm run build` → upload `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

---

## 💡 What Problem Does It Solve?

Students today struggle with:
- ❌ No single platform to **learn, take notes, and practice** together
- ❌ Expensive AI tools with paywalls
- ❌ Scattered resources across multiple apps
- ❌ No way to track learning progress

**AI StudyMate solves all of this** — one free platform with AI assistance built in.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Auth System** | Register, Login, Logout — fully working with localStorage |
| 🤖 **AI Chat** | Ask any study question — powered by Cohere AI (Free) |
| 📝 **Smart Notes** | Create, edit, delete, tag and search notes |
| 🧠 **Quiz & Practice** | Take quizzes on JS, React, CSS — auto scored with review |
| 📚 **Learning Hub** | Browse topics and read AI-generated summaries |
| 📊 **Progress Tracker** | Track topics learned, notes created, quizzes taken, streaks |
| 🔖 **Bookmarks** | Save and organize useful URLs and resources |
| 🌙 **Dark / Light Mode** | Theme preference saved across sessions |
| 📱 **Fully Responsive** | Mobile-first design with hamburger sidebar |
| 💾 **No Backend Needed** | 100% localStorage powered — works offline |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI Framework |
| **Vite** | 6 | Build Tool & Dev Server |
| **Tailwind CSS** | v4 | Utility-first Styling |
| **React Router DOM** | v7 | Client-side Routing |
| **Lucide React** | latest | Icons |
| **Cohere AI API** | v1 | AI Chat (Free Tier) |
| **localStorage** | Browser API | Data Persistence (No Backend) |

---

## 📁 Folder Structure

```
src/
├── components/layout/
│   ├── Sidebar.jsx        ← Desktop navigation
│   ├── Navbar.jsx         ← Mobile top bar
│   └── ProtectedLayout.jsx ← Auth guard
├── context/
│   ├── AuthContext.jsx    ← Global auth state
│   └── ThemeContext.jsx   ← Dark/Light mode
├── hooks/
│   └── useLocalStorage.js ← Custom hook
├── pages/
│   ├── Landing.jsx        ← Public home page
│   ├── Login.jsx          ← Login
│   ├── Register.jsx       ← Register
│   ├── Dashboard.jsx      ← Stats & overview
│   ├── Learn.jsx          ← Topic browser
│   ├── Notes.jsx          ← Notes CRUD
│   ├── AIChat.jsx         ← AI chat interface
│   ├── Quiz.jsx           ← Quiz system
│   ├── Profile.jsx        ← User profile
│   ├── Settings.jsx       ← App settings
│   ├── Progress.jsx       ← Progress tracker
│   ├── Bookmarks.jsx      ← Saved links
│   └── NotFound.jsx       ← 404 page
├── utils/
│   └── localStorage.js    ← All data helpers
├── App.jsx                ← Router
└── main.jsx               ← Entry point
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/ai-studymate.git
cd ai-studymate

# 2. Install dependencies
npm install

# 3. Add your Cohere API key in src/pages/AIChat.jsx
# Replace: 'Bearer YOUR_COHERE_KEY_HERE'

# 4. Start development server
npm run dev
```

Open **http://localhost:5173** 🎉

---

## 📦 Git Commit History

```
feat: add AI chat with Cohere API integration
feat: notes CRUD + quiz system + progress tracker
feat: dashboard with stats, learning hub, bookmarks
feat: auth system with localStorage (register/login/logout)
feat: sidebar + navbar + protected routes layout
feat: landing page, login, register pages
chore: initial Vite + React 19 + Tailwind v4 setup
```

---

## 🔑 Environment

No `.env` file needed. Just paste your **Cohere API key** directly in `AIChat.jsx`:

```js
'Authorization': 'Bearer your_cohere_trial_key_here'
```

Get free key → https://dashboard.cohere.com/api-keys

---

## 📄 License

MIT © 2024 AI StudyMate
