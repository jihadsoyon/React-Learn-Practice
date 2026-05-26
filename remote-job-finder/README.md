# 🌍 Remotely — Remote Job Finder Platform

A modern, full-featured Remote Job Finder web app built with **React.js**, **Tailwind CSS**, and **JavaScript**.

# Live Link
https://remote-job-finder.netlify.app/

---

## 🚀 Quick Start

```bash
# 1. Create React App
npx create-react-app remote-job-finder
cd remote-job-finder

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Install dependencies
npm install react-router-dom
npm install lucide-react
npm install recharts

# 4. Copy all source files, then start
npm start
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Sticky navbar, dark mode, auth, mobile menu
│   ├── JobCard.jsx             # Job card with bookmark + compare toggle
│   ├── SearchBar.jsx           # Search input with filter toggle
│   ├── FilterPanel.jsx         # Category, location, type, salary filters
│   ├── CompanyModal.jsx        # Job detail modal with apply button
│   ├── CompareModal.jsx        # Side-by-side job comparison modal
│   ├── SkeletonCard.jsx        # Loading skeleton placeholder
│   ├── EmptyState.jsx          # Empty search / bookmarks state
│   ├── AIJobMatch.jsx          # AI Dream Job Matcher with skill input
│   ├── SalaryInsights.jsx      # Salary charts (bar, distribution, radar)
│   ├── SkillGapAnalyzer.jsx    # Skill gap analysis with learning resources
│   ├── LiveJobToast.jsx        # Live job alert toast notifications
│   └── useLiveJobAlerts.js     # Hook for live job alert simulation
├── pages/
│   ├── Home.jsx                # Landing page with featured jobs + CTA
│   ├── Jobs.jsx                # Full job listing with search + pagination
│   ├── Bookmarks.jsx           # Saved jobs (auth-gated)
│   ├── AIMatch.jsx             # AI Dream Job Matcher page
│   ├── Insights.jsx            # Salary Insights + Skill Gap Analyzer page
│   ├── Login.jsx               # Sign in page
│   └── Register.jsx            # Create account page
├── context/
│   ├── AuthContext.jsx         # Login, register, logout state
│   └── JobContext.jsx          # Bookmarks, dark mode state
├── data/
│   └── fakeJobs.js             # 12 mock jobs + fake API with filters
├── App.jsx                     # Router setup + compare state + live alerts
├── index.js                    # Entry point
└── index.css                   # Tailwind + custom styles
```

---

## ✅ Features

| Feature | Details |
|---|---|
| 🔍 Job Search | Real-time search by title, keyword, company |
| 🎛 Filters | Category, Location, Job Type, Salary Range |
| 🔖 Bookmarks | Save/unsave jobs, persisted in localStorage |
| 🏢 Company Modal | Full job details, requirements, benefits, apply |
| ⚖️ Job Compare | Select up to 3 jobs and compare side-by-side |
| 📄 Pagination | 6 jobs per page with numbered prev/next controls |
| 🌙 Dark Mode | System-aware + toggle, persisted |
| 💀 Skeletons | Loading state with shimmer placeholders |
| 🚫 Empty State | Friendly UI when no results found |
| 🔐 Auth System | Register + Login + Logout (localStorage-based) |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| 🎨 Animations | CSS keyframe animations on cards and modals |
| 🤖 AI Job Matcher | Skill-based job matching with match score + resume upload |
| 📊 Salary Insights | Bar chart, distribution chart & radar chart by category |
| 🎯 Skill Gap Analyzer | Compare your skills vs job requirements with learning links |
| 🔥 Live Job Alerts | Real-time toast notifications when new jobs arrive |

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, featured jobs, CTA |
| `/jobs` | Find Jobs | Search, filter, paginate all 12+ jobs |
| `/ai-match` | AI Match | Enter skills → get AI-matched job suggestions |
| `/insights` | Insights | Salary charts + Skill Gap Analyzer |
| `/bookmarks` | Saved Jobs | Bookmarked jobs (requires login) |
| `/login` | Login | Sign in with email + password |
| `/register` | Register | Create new account |

---

## 🆕 New Features (v2)

### ⚖️ Job Compare
- Click `+` on any job card to add it to compare list
- Compare up to 3 jobs at once in a modal
- Side-by-side view: company, location, type, salary, skills
- Works from both Jobs page and Bookmarks page

### 🤖 AI Dream Job Matcher (`/ai-match`)
- Add your skills manually or upload a resume (PDF/DOCX)
- Select experience level (Entry / Mid / Senior)
- Get top 4 matches with % match score and reason
- Click any result to open full job details

### 📊 Salary Insights (`/insights` → Salary tab)
- Filter by job category
- Average salary bar chart per category
- Salary range distribution chart
- Work style radar chart (Remote / Hybrid / On-site)
- Live stat cards: avg salary, highest pay, most jobs

### 🎯 Skill Gap Analyzer (`/insights` → Skill Gap tab)
- Enter your current skills
- Instantly see match % for every job
- Expandable cards show matched ✅ vs missing ❌ skills
- "Skills to Learn" section with direct learning resource links
- Full match overview bar chart for all 12 jobs

### 🔥 Live Job Alerts
- Simulated live job alerts appear as toast notifications
- First alert after 4 seconds, then every 12 seconds
- Auto-dismiss after 6 seconds with countdown progress bar
- Shows company logo, title, location, salary range
- Max 4 toasts visible at once (bottom-right corner)

---

## 🎨 Design System

- **Primary**: Blue `#2563eb`
- **Accent**: Cyan `#06b6d4`, Violet `#7c3aed`
- **Fonts**: Clash Display (headings) + DM Sans (body)
- **Radius**: Cards `2xl`, Buttons `xl`, Tags `lg`
- **Dark mode**: Tailwind `dark:` classes throughout
- **Charts**: Recharts library with dark-themed tooltips

---

## 🔒 Auth Notes

- Users stored in `localStorage` as `rjf_users`
- Session stored as `rjf_user`
- Bookmarks stored as `rjf_bookmarks`
- Register → auto login → redirect to Home
- Applying to a job while logged out → redirects to Login
- Bookmarks page is auth-gated (shows sign-in prompt for guests)

---

## 📦 Tech Stack

| Package | Version | Usage |
|---|---|---|
| React | 18 | UI framework |
| React Router | v6 | Client-side routing |
| Tailwind CSS | v3 | Utility-first styling |
| Lucide React | latest | Icon library |
| Recharts | latest | Salary charts & radar |
| CSS Animations | — | No Framer Motion needed |

---

Built with ❤️ — Remotely Platform v2
