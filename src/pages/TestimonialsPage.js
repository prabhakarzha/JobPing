import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const data = snapshot.docs.map((doc) => doc.data());
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🗣️ What Users Say About Us</h2>
      {testimonials.length === 0 ? (
        <p className="text-center text-muted">No testimonials found.</p>
      ) : (
        <div className="row">
          {testimonials.map((t, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="rounded-circle me-3"
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0">{t.name}</h6>
                      <small className="text-muted">{t.role || "User"}</small>
                    </div>
                  </div>
                  <p className="mb-0">"{t.message}"</p>
                  {t.adminReply && (
                    <p className="mt-2 text-success">
                      <strong>Admin Reply:</strong> {t.adminReply}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
