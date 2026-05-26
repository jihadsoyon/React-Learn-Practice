# ✅ Todo App with Filters & LocalStorage (React)

A modern and clean **Todo Application** built with React, featuring task management, filtering, and persistent storage using localStorage.

---

## 🚀 Features

* ➕ Add new todos
* ❌ Delete todos
* ✅ Mark tasks as completed
* 🔍 Filter todos:

  * All
  * Active
  * Completed
* 💾 Persistent data using localStorage
* 🎨 Clean and responsive UI

---

## 🧠 Problem Statement

Build a Todo application that allows users to:

* Manage tasks dynamically
* Filter tasks based on status
* Persist data even after page reload

---

## 🛠️ My Approach

* Used **React Hooks (`useState`, `useEffect`)**
* Managed todos as an array of objects:

  * `id`
  * `text`
  * `completed`
* Implemented filtering logic using `.filter()`
* Synced state with **localStorage** using `useEffect`
* Built a clean UI using custom CSS

---

## ⚔️ Challenges Faced

* Keeping state and localStorage in sync
* Managing derived state for filtering
* Avoiding unnecessary re-renders
* Handling edge cases (empty input, duplicate actions)

---

## 🧩 Tech Stack

* React (Vite)
* JavaScript (ES6+)
* CSS3

---

## 📸 Demo

![alt text](<todo app.png>)

---

## 📂 Project Setup

```bash id="setup1"
# Clone the repository
git clone https://github.com/your-username/todo-app.git

# Navigate to project
cd todo-app

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 📊 Data Structure Example

```json id="data1"
[
  {
    "id": 17123456789,
    "text": "Learn React",
    "completed": false
  },
  {
    "id": 17123456790,
    "text": "Build Todo App",
    "completed": true
  }
]
```

---

## 🎯 What I Learned

* State management in React
* Working with localStorage
* Building dynamic UI
* Writing clean and maintainable code

---

## 👨‍💻 Author

**Jihad Soyon**
Full Stack Developer 🚀
