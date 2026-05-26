// src/pages/Landing.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "../firebase/config";

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    background: "#0a0a0f",
  },
  glow1: {
    position: "absolute", top: "20%", left: "20%",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "#6ee7b7", opacity: 0.06, filter: "blur(80px)", pointerEvents: "none",
  },
  glow2: {
    position: "absolute", bottom: "20%", right: "20%",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "#818cf8", opacity: 0.06, filter: "blur(80px)", pointerEvents: "none",
  },
  grid: {
    position: "absolute", inset: 0,
    backgroundImage: "linear-gradient(#6ee7b7 1px, transparent 1px), linear-gradient(90deg, #6ee7b7 1px, transparent 1px)",
    backgroundSize: "60px 60px", opacity: 0.03, pointerEvents: "none",
  },
  center: {
    position: "relative", zIndex: 10,
    maxWidth: "600px", width: "100%", textAlign: "center",
  },
};

const Landing = ({ onSearch }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [focused, setFocused] = useState(false);
  const [tokenFocused, setTokenFocused] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) onSearch(username.trim(), token.trim() || null);
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const githubUsername =
        result.user.reloadUserInfo?.screenName ||
        result.additionalUserInfo?.username;
      const accessToken = result.credential?.accessToken || null;
      if (githubUsername) onSearch(githubUsername, accessToken);
    } catch (err) {
      console.error(err);
    }
  };

  const inputBoxStyle = (isFocused) => ({
    display: "flex", alignItems: "center",
    borderRadius: "16px", overflow: "hidden",
    border: `1px solid ${isFocused ? "#6ee7b7" : "#1e1e2e"}`,
    background: "#111118", marginBottom: "12px",
    transition: "border-color 0.3s",
  });

  return (
    <div style={S.page}>
      <div style={S.grid} />
      <div style={S.glow1} />
      <div style={S.glow2} />

      <motion.div
        style={S.center}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <motion.div
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 16px", borderRadius: "999px",
            border: "1px solid #1e1e2e", color: "#6ee7b7",
            fontSize: "12px", fontFamily: "JetBrains Mono, monospace",
            marginBottom: "32px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6ee7b7" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          GitHub Analytics Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          style={{
            fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 700,
            lineHeight: 1.05, marginBottom: "16px", color: "#e2e8f0",
            letterSpacing: "-1px", fontFamily: "Space Grotesk, sans-serif",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Visualize your<br />
          <span style={{ color: "#6ee7b7" }}>dev journey</span>
        </motion.h1>

        <motion.p
          style={{
            fontSize: "18px", color: "#64748b",
            marginBottom: "40px", fontFamily: "Space Grotesk, sans-serif",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Beautiful analytics for any GitHub profile. Instant. Cinematic.
        </motion.p>

        {/* Search form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Username input */}
          <div style={inputBoxStyle(focused)}>
            <span style={{ padding: "0 12px 0 20px", color: "#64748b", fontSize: "18px" }}>⌕</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter GitHub username..."
              style={{
                flex: 1, padding: "20px 16px",
                background: "transparent", border: "none", outline: "none",
                color: "#e2e8f0", fontSize: "14px",
                fontFamily: "JetBrains Mono, monospace",
              }}
            />
            <motion.button
              type="submit"
              style={{
                padding: "14px 24px", margin: "6px", borderRadius: "12px",
                background: "#6ee7b7", color: "#0a0a0f",
                fontWeight: 700, fontSize: "14px", border: "none",
                cursor: "pointer", fontFamily: "Space Grotesk, sans-serif",
                whiteSpace: "nowrap",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze →
            </motion.button>
          </div>

          {/* Token toggle */}
          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#64748b", fontSize: "11px",
                fontFamily: "JetBrains Mono, monospace",
                display: "flex", alignItems: "center", gap: "6px",
                padding: "4px 0",
              }}
            >
              <span style={{
                display: "inline-block",
                transform: showToken ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}>▶</span>
              {showToken ? "Hide" : "Add GitHub token"} for full contribution graph
            </button>

            <AnimatePresence>
              {showToken && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ ...inputBoxStyle(tokenFocused), marginTop: "8px", marginBottom: "4px" }}>
                    <span style={{ padding: "0 12px 0 20px", color: "#64748b", fontSize: "14px" }}>🔑</span>
                    <input
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      onFocus={() => setTokenFocused(true)}
                      onBlur={() => setTokenFocused(false)}
                      placeholder="ghp_xxxxxxxxxxxx (optional)"
                      style={{
                        flex: 1, padding: "16px 16px",
                        background: "transparent", border: "none", outline: "none",
                        color: "#e2e8f0", fontSize: "13px",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    />
                  </div>
                  <p style={{
                    fontSize: "10px", color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                    textAlign: "left", paddingLeft: "4px",
                  }}>
                    Token needs <strong style={{ color: "#6ee7b7" }}>read:user</strong> scope only.{" "}
                    <a
                      href="https://github.com/settings/tokens/new?scopes=read:user"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#6ee7b7", textDecoration: "underline" }}
                    >
                      Generate one here →
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "#1e1e2e" }} />
          <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "JetBrains Mono, monospace" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#1e1e2e" }} />
        </div>

        {/* GitHub login */}
        <motion.button
          onClick={handleGithubLogin}
          style={{
            width: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "10px",
            padding: "16px", borderRadius: "16px",
            border: "1px solid #1e1e2e", background: "transparent",
            color: "#e2e8f0", fontSize: "15px", fontWeight: 600,
            cursor: "pointer", fontFamily: "Space Grotesk, sans-serif",
          }}
          whileHover={{ borderColor: "#6ee7b7", scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          🐙 Continue with GitHub
          <span style={{ fontSize: "11px", color: "#6ee7b7", fontFamily: "JetBrains Mono, monospace" }}>
            (full graph ✓)
          </span>
        </motion.button>

        {/* Pills */}
        <motion.div
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "12px", marginTop: "40px", flexWrap: "wrap",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {["📊 Repo analytics", "🌐 Language chart", "⚡ Activity feed", "🟩 Contribution graph"].map((t, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 14px", borderRadius: "999px",
              border: "1px solid #1e1e2e", color: "#64748b",
              fontSize: "12px", fontFamily: "JetBrains Mono, monospace",
            }}>
              {t}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;