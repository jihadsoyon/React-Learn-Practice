
# Live Link
https://keen-keeper0.netlify.app/

# KeenKeeper

> **Your personal shelf of meaningful connections.** Browse, tend, and nurture the relationships that matter most.

---

## Overview

KeenKeeper is a relationship management web app that helps you stay in touch with the people who matter most in your life. It tracks how long since you last contacted each friend, reminds you when someone is overdue for a check-in, and logs every interaction in a personal timeline — so no meaningful connection quietly fades away.

---

## Features

### Home Dashboard
- Displays all your friends in a **responsive grid layout**
- Summary cards at the top show: **Total Friends**, **On Track**, **Need Attention**, and **Interactions This Month**
- Each friend card shows their avatar, name, days since last contact, tags, and current status
- Smooth **loading skeleton animation** while friends data is being fetched
- Click any card to navigate to that friend's detail page

### Friend Details Page
- Full profile view with avatar, bio, email, tags, and contact status
- **Three stat cards** showing Days Since Contact, Goal (Days), and Next Due Date
- **Relationship Goal** section showing how often you aim to connect — with an Edit button
- **Quick Check-In panel** with three actions:
  -  Call
  -  Text
  -  Video
- Each check-in logs an entry to the Timeline and shows a **toast notification** confirming the action
- Action buttons for **Snooze 2 Weeks**, **Archive**, and **Delete** (UI-ready)
- Graceful **"Friend not found"** fallback with a back-to-home button

### Timeline Page
- Shows a **chronological log** of all check-ins across all friends
- Each entry displays interaction type (Call / Text / Video), friend name, and date
- **Filter dropdown** to view All, Call, Text, or Video entries only
- Color-coded icons for each interaction type (green for call, blue for text, purple for video)
- Empty state message when no entries match the filter

### Stats Page
- Visual **donut/pie chart** of check-in interactions by type (Call, Text, Video, Meetup)
- Powered by **Recharts** with interactive tooltips and legend
- Dynamically reads from Timeline context — updates in real time as you log interactions

### Toast Notification System
- Appears at the bottom-right of the screen after a check-in is logged
- Auto-dismisses after **3 seconds**
- Smooth **slide-up animation** via custom CSS keyframe

### Persistent Storage
- All timeline entries are saved to **localStorage** so they survive page refreshes
- State is managed globally via **React Context API** (TimelineProvider)

### Navigation
- Sticky top **Navbar** with active link highlighting (green background on active route)
- Links: Home · Timeline · Stats
- Branded footer with social links and legal pages

### 404 Not Found Page
- Clean, centered error page with a **"Back to Home"** button

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **State Management** | React Context API + `useState` / `useEffect` |
| **Persistence** | Browser `localStorage` |
| **Data Source** | Static `friends.json` (local JSON) |
| **Language** | JavaScript (JSX) |

---

## Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── FriendCard.jsx      # Friend grid card with status & tags
│   ├── Navbar.jsx          # Sticky top navigation bar
│   ├── Footer.jsx          # Site footer with social links
│   └── Toast.jsx           # Auto-dismiss notification component
├── context/
│   └── TimelineContext.jsx # Global state for check-in timeline
├── data/
│   └── friends.json        # Friend records (id, name, status, tags, etc.)
├── pages/
│   ├── Home.jsx            # Dashboard with friend grid & summary cards
│   ├── FriendDetails.jsx   # Individual friend profile & check-in page
│   ├── Timeline.jsx        # Filterable log of all interactions
│   ├── Stats.jsx           # Pie chart analytics of interaction types
│   └── NotFound.jsx        # 404 fallback page
├── App.jsx                 # Root component with routing & layout
├── main.jsx                # React DOM entry point
└── index.css               # Tailwind import + custom animations
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/keenkeeper.git
cd keenkeeper

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Friend Status Logic

Each friend has a `status` field that reflects how recently they were contacted relative to their personal goal:

| Status | Meaning | Badge Color |
|---|---|---|
| `on-track` | Contacted within goal window | 🟢 Green |
| `almost due` | Approaching the deadline | 🟡 Yellow |
| `overdue` | Past the goal deadline | 🔴 Red |

---
## Design Highlights

- **Color palette:** Green-700 primary (`#15803d`), neutral grays for backgrounds and borders
- **Typography:** System font stack via Tailwind defaults
- **Cards:** Rounded corners (`rounded-xl`), subtle borders, hover lift effect (`hover:-translate-y-0.5`)
- **Responsive:** 2-column mobile → 3-column tablet → 4-column desktop grid
- **Animations:** Custom `slide-up` keyframe for toast, `animate-spin` for loading state


---
