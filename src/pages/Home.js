import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { auth, db } from "../firebase/firebase";
import "../pages/Home.css";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const adminDocRef = doc(db, "admins", user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      if (adminDocSnap.exists() && adminDocSnap.data().email === user.email) {
        navigate("/admin");
      } else {
        navigate("/form");
      }
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        adminEmail,
        adminPassword
      );

      const adminDocRef = doc(db, "admins", result.user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      if (
        adminDocSnap.exists() &&
        adminDocSnap.data().email === result.user.email
      ) {
        navigate("/admin");
      } else {
        setError("Login failed or no access.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Login failed or no access.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="home-container"
      style={{
        background: "linear-gradient(120deg, #1a237e, #0d47a1)",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <img src="/logo.jpeg" alt="Logo" className="logo-img" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-box"
        style={{
          background: "#ffffff10",
          border: "1px solid #ffffff20",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* User Login */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ marginBottom: "20px", color: "#81d4fa" }}>User Login</h2>
          <Button
            onClick={handleGoogleLogin}
            variant="contained"
            disabled={loading}
            className="google-btn"
            startIcon={!loading && <FcGoogle style={{ fontSize: "24px" }} />}
            sx={{
              background: "linear-gradient(45deg, #00c853, #64dd17)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#43a047" },
              width: "100%",
              py: 1.5,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign in with Google"
            )}
          </Button>
        </div>

        {/* Admin Login */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#ce93d8",
            }}
          >
            Admin Login
          </h2>
          <form
            onSubmit={handleAdminLogin}
            className="admin-form"
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: "linear-gradient(45deg, #8e24aa, #d81b60)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#ab47bc" },
                width: "100%",
                py: 1.5,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "LOGIN"
              )}
            </Button>
          </form>
          {error && (
            <p
              style={{
                color: "#ff8a80",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </motion.div>
      {/* 
      <footer style={{ marginTop: "40px", textAlign: "center", color: "#bbb" }}>
        Designed & Developed by <strong>Prabhakar Kumar</strong> — Software
        Developer. Powered by React + Firebase
      </footer> */}
    </div>
  );
};

export default Home;
