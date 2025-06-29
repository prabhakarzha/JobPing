import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SubmitApplication.css";

import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

import { formFields, validateForm, defaultFormData } from "../utils/formConfig";
import JobApplicationFields from "../components/JobApplicationFields";

const SubmitApplication = ({ user }) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const dataToStore = {
      ...formData,
      resume: formData.resume?.name || "",
      uid: user?.uid || "",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "formResponses"), dataToStore);
      alert("✅ Application submitted successfully!");
      navigate("/success-page");
    } catch (error) {
      console.error("❌ Firestore error:", error);
      alert("Failed to save your application. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        ...defaultFormData,
        email: user?.email || "",
      });
      setErrors({});
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        minHeight: "100vh",
        padding: "3rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        color: "#fff",
      }}
    >
      <div
        className="shadow-lg p-4"
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#ffffff10",
          border: "1px solid #ffffff20",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-center mb-3 fw-bold" style={{ color: "#81d4fa" }}>
          📝 Apply for Your Dream Job
        </h2>

        <p className="text-center mb-4" style={{ color: "#bbdefb" }}>
          Fill in your details to submit your application
        </p>

        <form className="row g-4" onSubmit={handleSubmit} noValidate>
          <JobApplicationFields
            formFields={formFields}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
          <div className="col-12">
            <button
              type="submit"
              className="btn w-100 py-2 fw-semibold"
              disabled={loading}
              style={{
                background: "linear-gradient(45deg, #29b6f6, #66bb6a, #ffa726)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
              }}
            >
              {loading ? "⏳ Submitting..." : " Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitApplication;
