import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TestimonialForm = ({ user, onTestimonialAdded }) => {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "testimonials"), {
        name: user.displayName || "Anonymous",
        photo: user.photoURL || "",
        message,
        uid: user.uid || "",
        timestamp: serverTimestamp(),
      });

      setMessage("");
      onTestimonialAdded(); // optional: to refresh testimonials if needed
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      alert("❌ Failed to submit testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h5 className="mb-3 text-center" style={{ color: "#007bff" }}>
        💬 Share your experience
      </h5>
      <textarea
        className="form-control mb-3"
        placeholder="Write your testimonial..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
};

export default TestimonialForm;
