// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = ({ user }) => {
  const handleLogout = () => signOut(auth);

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #1e1e2e",
        background: "rgba(10,10,15,0.95)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "#6ee7b7", color: "#0a0a0f",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "13px", fontFamily: "JetBrains Mono, monospace",
          flexShrink: 0,
        }}>
          DP
        </div>
        <span style={{
          fontWeight: 700, fontSize: "17px", color: "#e2e8f0",
          fontFamily: "Space Grotesk, sans-serif",
        }}>
          DevPulse
        </span>
      </div>

      {/* Right side */}
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{
              width: "32px", height: "32px",
              borderRadius: "50%", border: "2px solid #6ee7b7",
              display: "block",
            }}
          />
          <span style={{
            fontSize: "13px", color: "#94a3b8",
            fontFamily: "Space Grotesk, sans-serif",
          }}>
            {user.displayName}
          </span>
          <motion.button
            onClick={handleLogout}
            style={{
              padding: "7px 16px", borderRadius: "8px",
              background: "transparent",
              border: "1px solid #1e1e2e", color: "#64748b",
              cursor: "pointer", fontSize: "12px",
              fontFamily: "JetBrains Mono, monospace",
            }}
            whileHover={{ borderColor: "#6ee7b7", color: "#6ee7b7" }}
          >
            logout
          </motion.button>
        </div>
      ) : (
        <div style={{ width: "80px" }} />
      )}
    </motion.nav>
  );
};

export default Navbar;