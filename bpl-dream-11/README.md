# ⚽ Dream Soccer Trio — Build Your Ultimate Squad

<p align="center">
  <a href="https://dream-soccer-trio3.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-View_Project-success?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-Fast-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-Modern-38B2AC?style=for-the-badge&logo=tailwind-css" />
</p>

## 🚀 Live Demo
👉 **[https://dream-soccer-trio3.netlify.app/](https://dream-soccer-trio3.netlify.app/)**

## 🎯 Project Overview

**Dream Soccer Trio** is an interactive football web app where users can explore players and dynamically build their own dream team by selecting players.

Built with modern React practices, it focuses on **component-driven architecture**, clean state management, and a beautiful responsive UI.

## ⚽ Key Features

- 🧑‍🤝‍🧑 Browse available football players
- ✅ Select preferred players
- ❌ Remove players from your squad
- 🔄 Real-time dynamic UI updates
- 📱 Fully responsive design
- ⚡ Fast and smooth performance with Vite

## 🧠 How It Works

- Players are shown in the **Available Players** section
- Selected players move to the **Selected Players** section
- State is managed in the parent component and passed via props
- UI updates instantly on every selection/removal

## 🏗️ Project Structure

```bash
src/
├── assets/                  # Images & static files
├── Components/
│   ├── Homepage/
│   │   ├── Banner/
│   │   ├── Players/
│   │   │   ├── AvailablePlayers/
│   │   │   ├── SelectedPlayers/
│   │   │   └── Players.jsx
│   │   └── Navbar/
├── App.jsx
├── main.jsx
└── index.css
