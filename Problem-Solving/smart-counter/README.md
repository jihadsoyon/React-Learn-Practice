# 🚀 Smart Counter (Advanced React Problem)

An advanced counter application built with React that goes beyond basic increment/decrement functionality by handling edge cases, state history, and user-controlled step values.

---

## ✨ Features

* 🔢 Increment & Decrement functionality
* 🚫 Prevents value from going below **0**
* ⚡ Custom **Step Input** (e.g., +1, +5, +10)
* 🔁 **Undo Functionality** (reverts to previous state)
* 🧠 State history tracking

---

## 🧩 Problem Statement

Build a smart counter that:

* Supports increment and decrement operations
* Prevents negative values
* Allows dynamic step control
* Maintains a history of previous states
* Provides an undo mechanism

---

## 🛠️ My Approach

* Used **React state (`useState`)** to manage counter value
* Maintained a **history array** to store previous states
* Implemented **undo logic** by popping the last state
* Controlled edge cases like:

  * Preventing negative values
  * Handling empty/invalid step input

---

## ⚠️ Challenges Faced

* Managing **state history efficiently** without breaking UI
* Avoiding unnecessary re-renders
* Handling edge cases for user input (step value)
* Implementing clean undo logic

---

## 🧠 What I Learned

* Advanced state management techniques
* Handling edge cases in real-world UI
* Writing cleaner and scalable React logic
* Thinking beyond basic CRUD functionality

---

## 📸 Demo

![alt text](<smart counter.png>)
---

## 📂 Tech Stack

* React
* JavaScript (ES6+)
* CSS / Tailwind (if used)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/smart-counter.git
cd smart-counter
npm install
npm run dev
```

---

## 🧑‍💻 Author

**Jihad Soyon**

---

## ⭐ Final Note

This project focuses on **problem-solving and state management**, which are critical skills for building scalable frontend applications.
