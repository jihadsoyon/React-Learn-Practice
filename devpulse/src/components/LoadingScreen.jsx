// src/components/LoadingScreen.jsx
import { motion } from "framer-motion";

const LoadingScreen = ({ message = "Fetching data..." }) => {
  return (
    <motion.div
      style={{
        position: "fixed", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 50, background: "#0a0a0f",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated grid lines */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.15 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute", height: "1px", width: "100%",
              top: `${i * 5}%`, background: "#6ee7b7",
            }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        style={{
          position: "relative",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "24px",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Logo */}
        <div style={{ position: "relative" }}>
          <motion.div
            style={{
              width: "80px", height: "80px", borderRadius: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px", fontWeight: 700,
              fontFamily: "JetBrains Mono, monospace",
              background: "#6ee7b7", color: "#0a0a0f",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            DP
          </motion.div>
          <motion.div
            style={{
              position: "absolute", inset: 0, borderRadius: "20px",
              background: "#6ee7b7",
            }}
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "14px", color: "#6ee7b7",
          }}>
            {message}
          </p>
          <div style={{ display: "flex", gap: "6px", marginTop: "12px", justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#6ee7b7",
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;