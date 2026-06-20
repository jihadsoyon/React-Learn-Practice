# 🚀 React Reusable Modal System

A clean and scalable **Reusable Modal System** built with React.
This project demonstrates modern React architecture using **Context API + Custom Hooks** to manage global modal state efficiently.

---

## ✨ Features

* 🔓 Open / Close Modal
* 🧩 Multiple Modal Support
* ♻️ Fully Reusable Modal Component
* 🌐 Global State Management (Context API)
* 🪝 Custom Hook (`useModal`)
* 🎨 Modern UI with backdrop blur & animation

---

## 🧠 Problem Statement

Managing modals in React becomes messy when:

* Multiple modals exist
* State is passed through many components (prop drilling)
* Code becomes hard to maintain

---

## 💡 Solution

This project solves the problem by:

* Using **Context API** to manage modal state globally
* Creating a **custom hook (`useModal`)** for clean access
* Building a **reusable modal component** that works everywhere

---

## 🏗️ Architecture Overview

```
App
 └── ModalProvider (Context)
      └── Content
           ├── Buttons (open modal)
           └── Modal Component (Reusable)
```

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Modal.jsx
│   ├── ModalProvider.jsx
│
├── hooks/
│   └── useModal.js
│
├── App.jsx
├── main.jsx
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/jihadsoyon/React-Learn-Practice.git

# Navigate to project
cd React-Learn-Practice/Problem-Solving/react-modal-system

# Install dependencies
npm install

# Run the project
npm run dev
```

---

## 🧪 How It Works

### 🔹 Open Modal

```js
openModal("modal1");
```

### 🔹 Close Modal

```js
closeModal();
```

### 🔹 Access Modal State

```js
const { activeModal } = useModal();
```

---

## 🎯 Key Learning Points

* State lifting vs global state
* Avoiding prop drilling
* Clean component architecture
* Reusability in React
* Custom hooks for abstraction

---

## 📸 Preview

> Add your project screenshot or GIF here

---

## 🤝 Contributing

Feel free to fork this project and improve it.

---

## 📬 Contact

If you like this project, connect with me on LinkedIn 🚀

---

## ⭐ Support

Give a ⭐ if you found this helpful!
