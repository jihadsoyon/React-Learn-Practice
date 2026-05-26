// src/components/Footer.jsx
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    style={{
      borderTop: "1px solid #1e1e2e",
      background: "#0a0a0f",
      padding: "28px 32px",
      marginTop: "64px",
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <div style={{
      maxWidth: "1100px", margin: "0 auto",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "16px",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "8px",
          background: "#6ee7b7", color: "#0a0a0f",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "11px", fontFamily: "JetBrains Mono, monospace",
        }}>
          DP
        </div>
        <span style={{ fontWeight: 600, fontSize: "14px", color: "#e2e8f0", fontFamily: "Space Grotesk, sans-serif" }}>
          DevPulse
        </span>
      </div>

      {/* Center text */}
      <p style={{ fontSize: "12px", color: "#64748b", fontFamily: "JetBrains Mono, monospace", textAlign: "center" }}>
        GitHub analytics · Powered by GitHub API
      </p>

      {/* Right */}
      <p style={{ fontSize: "12px", color: "#64748b", fontFamily: "JetBrains Mono, monospace" }}>
        © {new Date().getFullYear()} DevPulse
      </p>
    </div>
  </motion.footer>
);

export default Footer;