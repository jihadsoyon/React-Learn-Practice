# 🔍 Debounced Search Input (React)

A performant search input built with React that prevents unnecessary API calls using a debouncing technique.

---

## 📌 Problem

In a typical search input, every keystroke triggers an API call.

❌ This leads to:

* Too many unnecessary requests
* Poor performance
* Bad user experience

---

## 💡 Solution

Implemented a **debounce mechanism (500ms delay)** using `setTimeout` and `useEffect`.

✅ API call only triggers when:

* User stops typing for 500ms

---

## 🧠 How It Works

1. User types in the input field
2. `useEffect` starts a timer (`setTimeout`)
3. If user types again before 500ms:

   * Previous timer is cleared
4. After 500ms pause:

   * API call is triggered

---

## ⚙️ Features

* 🔄 Debounced API calls
* ⚡ Improved performance
* 🧹 Clean and optimized logic
* 🧠 Proper use of React hooks

---

## 🛠️ Tech Stack

* React
* JavaScript (ES6+)
* CSS / Tailwind (if used)

---

## 📂 Project Structure

```
src/
 ├── components/
 │    └── SearchInput.jsx
 ├── App.jsx
 └── main.jsx
```

---

## 📸 Preview

![alt text](<Screenshot 2026-04-19 212716.png>)

---

## 🔑 Key Code (Debounce Logic)

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    if (query) {
      fetchData(query);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query]);
```

---

## ⚠️ Challenges Faced

* Managing cleanup of previous timers
* Avoiding multiple API calls
* Ensuring smooth user experience

---

## 📈 What I Learned

* How debouncing improves performance
* Better understanding of `useEffect` lifecycle
* Writing cleaner and optimized React logic

---

## ⭐ Author

**Jihad Soyon**

If you found this helpful, consider giving a ⭐ to the repo!
