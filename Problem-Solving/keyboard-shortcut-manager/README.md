# ⌨️ Keyboard Shortcut Manager

A React app to create, manage, and trigger custom keyboard shortcuts — fully persisted in the browser.

## 🧩 Problem It Solves

Most web apps hardcode their keyboard shortcuts, leaving users with no way to customize, view, or manage them. This project solves that by letting users:
- Define their own keyboard shortcuts on the fly
- See exactly which combos trigger which actions
- Edit or remove shortcuts without touching code
- Have shortcuts persist across browser sessions

## ✨ Features

- **Ctrl + K** global shortcut to instantly open the "new shortcut" creator
- **Live key capture** — press any key combo and it's automatically detected and formatted
- **Create / Edit / Delete** shortcuts with a clean modal form
- **Real action triggers** — each shortcut can run a real action (alert, scroll to top/bottom, console log, reload)
- **LocalStorage persistence** — shortcuts survive page reloads
- **Conflict-safe key detection** — normalizes Ctrl/Shift/Alt combos consistently
- **Empty state UI** for first-time users
- **Responsive, dark-themed UI** built with Tailwind CSS v4


## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/jihadsoyon/React-Learn-Practice.git
cd React-Learn-Practice/Problem-Solving/keyboard-shortcut-manager

# 2. Install dependencies
npm install

# 3. Add your Cohere API key in src/pages/AIChat.jsx
# Replace: 'Bearer YOUR_COHERE_KEY_HERE'

# 4. Start development server
npm run dev
```

## 📸 ScreenShot
<img width="1919" height="700" alt="image" src="https://github.com/user-attachments/assets/04cfe2e1-83e4-4388-b022-5704ff235cb6" />
<img width="1919" height="837" alt="image" src="https://github.com/user-attachments/assets/2424dd84-ed9c-46ed-a656-129ba5d7434f" />


## 🛠 Tech Stack

- React 19.2
- Vite
- JavaScript (ES6+)
- Tailwind CSS v4.3
- LocalStorage API
- Lucide React (icons)
