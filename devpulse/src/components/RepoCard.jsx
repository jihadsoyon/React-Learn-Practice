// src/components/RepoCard.jsx
import { motion } from "framer-motion";

const langColors = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3776ab",
  Rust: "#ce422b", Go: "#00add8", Java: "#b07219", CSS: "#563d7c",
  HTML: "#e34c26", "C++": "#f34b7d", Ruby: "#701516",
};

const RepoCard = ({ repo, delay = 0 }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "block",
      padding: "18px",
      borderRadius: "16px",
      background: "#111118",
      border: "1px solid #1e1e2e",
      textDecoration: "none",
      color: "inherit",
      cursor: "pointer",
    }}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ borderColor: "#6ee7b7", y: -3 }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
      <h3 style={{
        fontWeight: 600, fontSize: "14px", color: "#e2e8f0",
        fontFamily: "Space Grotesk, sans-serif",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        paddingRight: "8px", flex: 1,
      }}>
        {repo.name}
      </h3>
      {repo.fork && (
        <span style={{
          fontSize: "11px", fontFamily: "JetBrains Mono, monospace",
          padding: "2px 8px", borderRadius: "999px",
          border: "1px solid #1e1e2e", color: "#64748b", flexShrink: 0,
        }}>
          fork
        </span>
      )}
    </div>

    <p style={{
      fontSize: "12px", lineHeight: 1.55, marginBottom: "14px",
      color: "#64748b", fontFamily: "Space Grotesk, sans-serif",
      display: "-webkit-box", WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical", overflow: "hidden",
    }}>
      {repo.description || "No description"}
    </p>

    <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "12px", color: "#64748b", fontFamily: "JetBrains Mono, monospace" }}>
      {repo.language && (
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: langColors[repo.language] || "#888",
            display: "inline-block", flexShrink: 0,
          }} />
          {repo.language}
        </span>
      )}
      <span>★ {repo.stargazers_count}</span>
      <span>⑂ {repo.forks_count}</span>
    </div>
  </motion.a>
);

export default RepoCard;