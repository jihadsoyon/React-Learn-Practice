// src/components/HeroSection.jsx
import { motion } from "framer-motion";

const HeroSection = ({ user, totalStars }) => {
  if (!user) return null;
  const joinYear = new Date(user.created_at).getFullYear();

  return (
    <motion.div
      style={{
        background: "#111118",
        border: "1px solid #1e1e2e",
        borderRadius: "20px",
        padding: "28px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* subtle glow */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "220px", height: "220px", borderRadius: "50%",
        background: "#6ee7b7", opacity: 0.04, filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap", position: "relative" }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={{
              width: "88px", height: "88px",
              borderRadius: "18px",
              border: "2px solid #6ee7b7",
              display: "block",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h1 style={{
            fontSize: "22px", fontWeight: 700, color: "#e2e8f0",
            fontFamily: "Space Grotesk, sans-serif", marginBottom: "4px",
          }}>
            {user.name || user.login}
          </h1>
          <p style={{
            color: "#6ee7b7", fontFamily: "JetBrains Mono, monospace",
            fontSize: "13px", marginBottom: "10px",
          }}>
            @{user.login}
          </p>

          {user.bio && (
            <p style={{
              color: "#94a3b8", fontSize: "13px", lineHeight: 1.65,
              marginBottom: "14px", fontFamily: "Space Grotesk, sans-serif",
              maxWidth: "500px",
            }}>
              {user.bio}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            {user.location && (
              <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "JetBrains Mono, monospace", display: "flex", alignItems: "center", gap: "5px" }}>
                📍 {user.location}
              </span>
            )}
            {user.company && (
              <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "JetBrains Mono, monospace", display: "flex", alignItems: "center", gap: "5px" }}>
                🏢 {user.company}
              </span>
            )}
            <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }}>
              👥 {user.followers} followers · {user.following} following
            </span>
            <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }}>
              📅 Joined {joinYear}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "12px",
            background: "#6ee7b7", color: "#0a0a0f",
            fontWeight: 700, fontSize: "14px",
            textDecoration: "none",
            fontFamily: "Space Grotesk, sans-serif",
            flexShrink: 0, alignSelf: "flex-start",
            whiteSpace: "nowrap",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View GitHub →
        </motion.a>
      </div>
    </motion.div>
  );
};

export default HeroSection;