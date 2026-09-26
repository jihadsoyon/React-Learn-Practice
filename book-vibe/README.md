# 📚 Book Vibes

🔗 Live Site: https://boook-vibes.netlify.app/

Book Vibes is a modern React-based web application that helps users discover books, manage their reading list, & organize books based on preferences like rating and total pages.

---

## ✨ Features

### 📖 1. Book Listing
- Display diffrent popular books (fiction, romance, fantasy, etc.)
- Info of every single books:
  - Book Name
  - Author Name
  - Category
  - Rating

---

### 🔍 2. Detailed Book View
- Separate details page for each book
- Full information about the book is shown

---

### 📌 3. Mark as Read
- User can add book to "Read List"
- If you try to add duplicate book, a warning (toast message) is displayed

---

### 💖 4. Wishlist Feature
- User can add books to Wishlist if they want
- Can't add to Wishlist if already on read list

---

### 💾 5. Local Storage Integration
- All read list data is saved in the browser's localStorage
- Data remains even after page refresh (persistent storage)
---

### 🔃 6. Sorting Functionality
User can sort the read list:
- 📄 By Total Pages
- ⭐ By Rating

---

### ⚡ 7. Real-time UI Update
- Adding a book instantly updates the UI
- No reload required

---

### 🔔 8. Toast Notification
- Success message (book added)
- Error message (duplicate book)

---

### 🎨 9. Responsive Design
- Mobile, tablet, desktop — সব device এ responsive

---

## 🛠️ Technologies Used

- ⚛️ React
- 🌐 React Router
- 🎨 Tailwind CSS
- 💡 Context API (State Management)
- 🔔 React Toastify
- 💾 Local Storage

---

## 📦 Installation

```bash
git clone https://github.com/jihadsoyon/React-Learn-Practice.git
cd React-Learn-Practice/book-vibes
npm install
npm run dev
