// src/App.jsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [searchedUsername, setSearchedUsername] = useState(null);
  const [githubToken, setGithubToken] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const handleSearch = (username, token = null) => {
    setGithubToken(token);
    setSearchedUsername(username);
  };

  const handleBack = () => {
    setSearchedUsername(null);
    setGithubToken(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111118", color: "#e2e8f0",
            border: "1px solid #1e1e2e",
            fontFamily: "Space Grotesk, sans-serif",
          },
        }}
      />
      <Navbar user={user} />
      <AnimatePresence mode="wait">
        {!searchedUsername ? (
          <Landing key="landing" onSearch={handleSearch} />
        ) : (
          <Profile
            key="profile"
            username={searchedUsername}
            token={githubToken}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;