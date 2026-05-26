import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeBtn}>
          ✕
        </button>
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  width: "400px",
  maxWidth: "90%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  position: "relative",
  animation: "fadeIn 0.3s ease",
};

const contentStyle = {
  marginTop: "10px",
  fontSize: "18px",
  color: "#333",
  textAlign: "center",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "12px",
  border: "none",
  background: "#f1f1f1",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Modal;