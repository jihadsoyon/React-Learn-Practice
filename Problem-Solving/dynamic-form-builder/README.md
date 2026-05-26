# 🚀 Dynamic Form Builder (React)

A powerful and flexible **Dynamic Form Builder** built with React, where users can dynamically create and manage form fields in real-time.

---

## ✨ Features

* ➕ Add new input fields dynamically
* ❌ Remove any field instantly
* 🔀 Support for multiple field types:

  * Text
  * Email
  * Password
* 📦 Form data collection on submit
* ⚡ Real-time UI updates with React state

---

## 🧠 Problem Statement

Build a dynamic form system where users can:

* Add or remove input fields
* Choose different input types
* Submit the form and view structured data

---

## 🛠️ My Approach

* Used **React state** to store an array of form fields
* Each field contains:

  * `id`
  * `type`
  * `value`
* Implemented dynamic rendering using `.map()`
* Used controlled inputs to sync UI with state
* Managed add/remove operations efficiently

---

## ⚔️ Challenges Faced

* Managing dynamic state structure for multiple inputs
* Handling controlled components for dynamic fields
* Keeping form data consistent after removing fields
* Ensuring unique IDs for each input field

---

## 🧩 Tech Stack

* React
* JavaScript (ES6+)
* Tailwind CSS (if used)

---

## 📸 Demo

![alt text](<Screenshot 2026-04-19 212606.png>)

---

## 📂 Project Setup

```bash
# Clone the repository
git clone https://github.com/your-username/dynamic-form-builder.git

# Go to project folder
cd dynamic-form-builder

# Install dependencies
npm install

# Run the project
npm run dev
```

---

## 📊 Output Example

```json
[
  {
    "type": "text",
    "value": "John"
  },
  {
    "type": "email",
    "value": "john@email.com"
  }
]
```

---

## 🎯 What I Learned

* Dynamic UI rendering in React
* Advanced state management
* Controlled vs uncontrolled components
* Building reusable form logic

---

## 📌 Author

**Jihad Soyon**
Frontend Developer 🚀