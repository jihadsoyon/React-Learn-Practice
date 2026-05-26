// src/components/StatCard.jsx
import { motion } from "framer-motion";

const StatCard = ({ label, value, icon, delay = 0 }) => (
  <motion.div
    style={{
      padding: "22px",
      borderRadius: "16px",
      background: "#111118",
      border: "1px solid #1e1e2e",
      position: "relative",
      overflow: "hidden",
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ borderColor: "#6ee7b7", y: -2 }}
  >
    <p style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</p>
    <motion.p
      style={{
        fontSize: "30px", fontWeight: 700,
        color: "#6ee7b7", fontFamily: "JetBrains Mono, monospace",
        marginBottom: "4px", lineHeight: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.2 }}
    >
      {value?.toLocaleString() ?? "—"}
    </motion.p>
    <p style={{ fontSize: "13px", color: "#64748b", fontFamily: "Space Grotesk, sans-serif" }}>
      {label}
    </p>
  </motion.div>
);

export default StatCard;