import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleMyApplication = () => {
    navigate("/my-application");
  };

  const handleUserTestimonials = () => {
    navigate("/testimonials");
  };

  const isAdmin = user?.email === "sonukashyap116@gmail.com";

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #007bff, #00bcd4)",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        flexDirection: "row",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        overflowX: "auto",
        borderRadius: "0 0 12px 12px",
      }}
    >
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          )}
          <div
            style={{ fontWeight: "500", fontSize: "14px", color: "#ffffff" }}
          >
            {user.displayName || user.email}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginLeft: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {/* ✅ Testimonials button only for non-admins */}
        {!isAdmin && (
          <button
            className="btn btn-warning btn-sm"
            style={{
              fontSize: "14px",
              padding: "6px 14px",
              fontWeight: "500",
            }}
            onClick={handleUserTestimonials}
          >
            User Testimonials
          </button>
        )}

        {!isAdmin && (
          <button
            className="btn btn-light btn-sm"
            style={{
              minWidth: "130px",
              fontSize: "14px",
              padding: "6px 14px",
              fontWeight: "500",
              color: "#007bff",
              border: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onClick={handleMyApplication}
          >
            My Application
          </button>
        )}

        <button
          className="btn btn-outline-light btn-sm"
          style={{
            minWidth: "90px",
            fontSize: "14px",
            padding: "6px 12px",
            fontWeight: "500",
            border: "1px solid #fff",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
