<div align="center">

# ⚡ DevPulse

### AI-Powered GitHub Analytics Dashboard

**Visualize any GitHub profile with cinematic animations, real-time data, and beautiful charts.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>

---

live link: https://dev0pulse.netlify.app/

## 🎯 What Problem Does DevPulse Solve?

Most developers have an impressive GitHub profile — but **nobody knows how to read it at a glance.** Recruiters spend less than 60 seconds reviewing a candidate's GitHub. Raw GitHub profiles are hard to parse, lack visual hierarchy, and don't tell a story.

**DevPulse fixes this.**

It transforms any GitHub username into a visually stunning analytics dashboard — giving recruiters, collaborators, and developers an instant, beautiful overview of a dev's entire journey.

---

## 🚀 How DevPulse Helps You

| Problem | How DevPulse Solves It |
|---|---|
| GitHub profiles look plain and hard to read | Transforms data into cinematic, animated dashboards |
| Hard to understand someone's tech stack at a glance | Visual language breakdown chart with percentages |
| Repository quality is buried under commit noise | Highlights top repos by stars, forks, and activity |
| No way to quickly judge a developer's activity | Real-time activity feed showing recent contributions |
| Slow repeated API calls | Firebase caching — loads in milliseconds on repeat visits |
| GitHub OAuth is complex to set up | One-click "Continue with GitHub" login |

---

## ✨ Features

- **🔍 Instant Profile Search** — Enter any GitHub username and get a full analytics dashboard in seconds
- **🐙 GitHub OAuth Login** — Sign in with your GitHub account for enhanced API rate limits
- **📊 Language Breakdown Chart** — Interactive pie chart showing your most-used programming languages with percentage bars
- **⭐ Stats Overview** — Public repos, total stars earned, followers, and following count — all in animated stat cards
- **📁 Top Repositories** — Beautifully displayed cards showing your best repos with language, stars, and fork count
- **⚡ Activity Feed** — Recent push events, watch events, and contributions displayed in a clean timeline
- **🔥 Firebase Caching** — Firestore caches GitHub data for 30 minutes, so repeat loads are instant
- **🎬 Cinematic Animations** — Every element animates in with Framer Motion for a jaw-dropping experience
- **📱 Fully Responsive** — Works perfectly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI component architecture |
| **Vite** | Lightning-fast dev server and build tool |
| **Framer Motion** | Cinematic page animations and micro-interactions |
| **Firebase Auth** | GitHub OAuth authentication |
| **Firebase Firestore** | Real-time data caching layer |
| **Recharts** | Interactive pie charts for language breakdown |
| **Axios** | GitHub REST API data fetching |
| **Lucide React** | Clean, consistent icon set |

---

## 📦 Getting Started

### Prerequisites

- A GitHub account
- A Firebase project (free Spark plan works)

### Installation

```bash
# Clone the repository
git clone https://github.com/jihadsoyon/React-Learn-Practice.git
cd React-Learn-Practice/devpulse

# Install dependencies
npm install

# Start development server
npm run dev
```

### Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project named `devpulse`
3. Enable **Firestore Database** (test mode)
4. Enable **Authentication → GitHub provider**
5. Add your Firebase config to `src/firebase/config.js`

### GitHub OAuth Setup

1. Go to **GitHub → Settings → Developer Settings → OAuth Apps**
2. Create a new OAuth App
3. Set callback URL to your Firebase auth handler URL
4. Paste the Client ID and Secret into Firebase GitHub Auth settings

---

## 📁 Project Structure

```
devpulse/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Fixed top navigation
│   │   ├── StatCard.jsx        # Animated metric cards
│   │   ├── RepoCard.jsx        # Repository display cards
│   │   ├── LanguageChart.jsx   # Pie chart + progress bars
│   │   ├── ActivityFeed.jsx    # Recent GitHub events
│   │   └── LoadingScreen.jsx   # Animated loading state
│   ├── pages/
│   │   ├── Landing.jsx         # Hero page with search
│   │   └── Dashboard.jsx       # Full analytics dashboard
│   ├── hooks/
│   │   ├── useGitHub.js        # GitHub API data fetching
│   │   └── useFirestore.js     # Firebase cache read/write
│   └── firebase/
│       └── config.js           # Firebase initialization
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT License — feel free to use this project in your own portfolio.

---

<div align="center">

Built with ❤️ to impress recruiters and fellow developers.

**[⬆ Back to top](#-devpulse)**

</div>
