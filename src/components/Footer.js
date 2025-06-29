import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#121212",
        color: "#bbb",
        textAlign: "center",
        padding: "16px 12px",
        fontSize: "14px",
        borderTop: "1px solid #333",
      }}
    >
      © {new Date().getFullYear()} Designed & Developed by{" "}
      <span style={{ color: "#00ffcc", fontWeight: "500" }}>
        Prabhakar Kumar
      </span>{" "}
      — Software Developer
    </footer>
  );
};

export default Footer;
