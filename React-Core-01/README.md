# ⚛️ React Core Concepts - 01

Welcome to my **React Core Learning Repository** 🚀  
This project contains the fundamental concepts of React that I learned and practiced while starting my React journey.

---

# 📚 Topics Covered

## 🔹 What is React?
- Introduction to React
- Why React is popular
- Component-based architecture
- Virtual DOM basics

---

## 🔹 Components in React
- What is a Component?
- Functional Components
- Reusable UI structure
- Creating and rendering components

```jsx
function Welcome() {
  return <h1>Hello React</h1>;
}
```

---

## 🔹 Declaring Components
- Creating components using functions
- Exporting & importing components
- Component naming conventions

```jsx
const Navbar = () => {
  return <nav>Navbar Component</nav>;
};
```

---

# 🔥 Dynamic Data Handling

## 🔹 Props
- Passing data from parent to child
- Making components reusable
- Dynamic UI rendering using props

```jsx
function User(props) {
  return <h2>Name: {props.name}</h2>;
}
```

---

## 🔹 Destructuring Props
- Cleaner syntax using destructuring

```jsx
function User({ name, age }) {
  return (
    <>
      <h2>{name}</h2>
      <p>{age}</p>
    </>
  );
}
```

---

# ⚡ Conditional Rendering

Different ways to render UI conditionally in React.

---

## 🔹 If / Else

```jsx
if (isLoggedIn) {
  return <h1>Welcome Back</h1>;
} else {
  return <h1>Please Login</h1>;
}
```

---

## 🔹 Ternary Operator

```jsx
{
  isLoggedIn ? <h1>Dashboard</h1> : <h1>Login</h1>;
}
```

---

## 🔹 Logical AND (&&)

```jsx
{
  isAdmin && <p>Admin Access Granted</p>;
}
```

---

## 🔹 Logical OR (||)

```jsx
{
  userName || "Guest User";
}
```

---

## 🔹 Conditional Rendering Using Variables

```jsx
let message;

if (isPremium) {
  message = <h2>Premium User</h2>;
} else {
  message = <h2>Free User</h2>;
}

return message;
```

---

# 🧠 Rendering Lists with map()

- Displaying multiple items dynamically
- Using `.map()` for rendering arrays
- Understanding unique `key` props

```jsx
const users = ["Jihad", "Rahim", "Karim"];

{
  users.map((user, index) => (
    <li key={index}>{user}</li>
  ));
}
```

---

# 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- JSX
- Vite

---

# 🎯 Learning Outcome

After completing this part, I can now:

✅ Understand React fundamentals  
✅ Create reusable components  
✅ Pass dynamic data using props  
✅ Use destructuring efficiently  
✅ Apply different conditional rendering techniques  
✅ Render lists dynamically using map()

---

# 📌 Repository Purpose

This repository is part of my React learning journey where I practice core concepts step by step to build a strong foundation in modern frontend development.

---

# 👨‍💻 Author

### Jihad Soyon
MERN Stack Developer 🚀
