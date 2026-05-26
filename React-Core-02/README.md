
# ⚛️ React Core Concepts - 02

Welcome to my **React Core Learning Repository - Part 02** 🚀  
This section focuses on React interactivity, state management, hooks, dynamic data loading, and React thinking patterns.

---

# 📚 Topics Covered

# 🔹 Event Handling in React

Learned different ways to handle events in React applications.

## ✅ Button Click Events

```jsx
function App() {
  const handleClick = () => {
    alert("Button Clicked");
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

## ✅ Inline Event Handling

```jsx
<button onClick={() => console.log("Inline Event")}>
  Click
</button>
```

---

## ✅ Passing Arguments in Events

```jsx
<button onClick={() => handleUser("Jihad")}>
  Send
</button>
```

---

# 🔥 React State Management

# 🔹 Introduction to State Change

- Understanding dynamic UI updates
- How React re-renders components
- Why state is important

---

# 🔹 useState Hook

Learned how to create and update state using `useState`.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </>
  );
}
```

---

# 🧠 Understanding React Hooks

- What are Hooks?
- Why hooks are useful
- Rules of hooks
- Managing component logic efficiently

---

# 🚀 Advanced Concept: use() Hook

(Advanced Topic)

Learned the basic concept of React's experimental `use()` hook.

- Reading async data directly
- Simplifying asynchronous rendering
- Modern React async handling

Example:

```jsx
const data = use(fetchData());
```

---

# 🌐 Dynamic Data Loading

# 🔹 API Call using use()

```jsx
const users = use(fetchUsers());
```

- Loading external data
- Rendering dynamic API data
- Understanding async rendering

---

# 🔹 Async Await Data Fetching

```jsx
const loadUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await response.json();

  console.log(data);
};
```

---

# 🔹 Data Loading using useEffect

(Optional Topic)

Learned how side effects work in React using `useEffect`.

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <>
      {
        users.map(user => (
          <h3 key={user.id}>{user.name}</h3>
        ))
      }
    </>
  );
}
```

---

# 🧩 Thinking in React

Learned how to think in React way:

- Breaking UI into components
- Identifying component hierarchy
- Making reusable components
- Managing state properly
- Passing data between components

---

# 🤖 AI Assisted Learning

Used AI guidance to:
- Understand difficult concepts
- Learn React logic faster
- Debug problems
- Improve coding patterns

---

# 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- JSX
- React Hooks
- Fetch API
- Vite

---

# 🎯 Learning Outcome

After completing this section, I can now:

✅ Handle events in React  
✅ Understand and update component state  
✅ Use `useState` hook properly  
✅ Understand the purpose of React hooks  
✅ Work with dynamic API data  
✅ Fetch data using async/await  
✅ Use `useEffect` for side effects  
✅ Think in a component-based React structure

---

# 📌 Repository Purpose

This repository documents my React learning journey step by step while building a strong foundation in modern frontend development.

---

# 👨‍💻 Author

### Jihad Soyon
Aspiring MERN Stack Developer 🚀
