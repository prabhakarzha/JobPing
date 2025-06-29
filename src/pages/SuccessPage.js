import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import TestimonialForm from "../components/TestimonialForm";
import "../styles/SuccessPage.css";

const SuccessPage = ({ user }) => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const data = snapshot.docs
        .map((doc) => doc.data())
        .filter((t) => t.name && t.message); // Filter out blank or default
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="success-page container py-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h1
          className="fw-bold mb-3"
          style={{ color: "#007bff", fontSize: "2.5rem" }}
        >
          🎉 Application Submitted!
        </h1>
        <p className="lead text-muted">
          Thank you for applying! Your application has been received
          successfully. ✨
        </p>
        <p style={{ color: "#555", fontSize: "15px" }}>
          We’ll notify you via email once your application is reviewed.
        </p>
        <div className="mt-4">
          <button
            className="btn"
            style={{
              background: "linear-gradient(45deg, #007bff, #00bcd4)",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
              padding: "10px 24px",
            }}
            onClick={() => navigate("/form")}
          >
            🚀 Submit Another Application
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="testimonial-section px-3"
      >
        <h3 className="text-center mb-4" style={{ color: "#333" }}>
          ❤️ What Our Applicants Say
        </h3>

        <div className="row justify-content-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className="card border-0 shadow-sm p-3"
                style={{
                  borderRadius: "15px",
                  background:
                    "linear-gradient(135deg, #e0f7fa, #ffffff, #e8f5e9)",
                }}
              >
                <div className="card-body text-center">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      border: "3px solid #00bcd4",
                    }}
                  />
                  <h5 className="fw-semibold mb-1">{testimonial.name}</h5>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    {testimonial.role || "User"}
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontStyle: "italic",
                      fontSize: "15px",
                      color: "#444",
                    }}
                  >
                    “{testimonial.message}”
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {user && (
        <TestimonialForm user={user} onTestimonialAdded={fetchTestimonials} />
      )}

      {/* <div className="text-center mt-5 text-muted" style={{ fontSize: "14px" }}>
        Designed & Built by <strong>Prabhakar Kumar</strong> — React + Firebase
      </div> */}
    </div>
  );
};

export default SuccessPage;
