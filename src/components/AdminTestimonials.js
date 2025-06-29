import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { motion } from "framer-motion";

const AdminTestimonials = () => {
  <div style={{ padding: "50px", textAlign: "center" }}>
    Admin Testimonials Page
  </div>;
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [replies, setReplies] = useState({});
  const [edits, setEdits] = useState({});
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          const adminDocRef = doc(db, "admins", user.uid);
          const adminDoc = await getDoc(adminDocRef);
          setIsAdmin(adminDoc.exists());
        } catch (err) {
          console.error("Error checking admin:", err);
        }
      }
      setCheckingAdmin(false);
    };

    if (user) checkAdmin();
    else setCheckingAdmin(false);
  }, [user]);

  const fetchTestimonials = async () => {
    try {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchTestimonials();
  }, [isAdmin]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "testimonials", id));
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleReplyChange = (id, text) => {
    setReplies((prev) => ({ ...prev, [id]: text }));
  };

  const handleEditChange = (id, text) => {
    setEdits((prev) => ({ ...prev, [id]: text }));
  };

  const handleSendReply = async (id) => {
    const replyText = replies[id]?.trim();
    if (!replyText) return;
    try {
      await updateDoc(doc(db, "testimonials", id), {
        adminReply: replyText,
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleSaveEdit = async (id) => {
    const newMessage = edits[id]?.trim();
    if (!newMessage) return;
    try {
      await updateDoc(doc(db, "testimonials", id), {
        message: newMessage,
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error editing testimonial:", error);
    }
  };

  if (loading || checkingAdmin)
    return <p className="text-center mt-5">🔄 Checking access...</p>;

  if (!user || !isAdmin) {
    return (
      <div className="text-center mt-5 text-danger">
        <h4>🚫 Access Denied</h4>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">📢 Manage Testimonials</h2>
      {testimonials.length === 0 ? (
        <p className="text-center text-muted">No testimonials found.</p>
      ) : (
        <div className="row">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className="col-md-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card shadow-sm border-0">
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

                  <textarea
                    className="form-control mb-2"
                    rows="3"
                    value={edits[t.id] ?? t.message}
                    onChange={(e) => handleEditChange(t.id, e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-warning mb-3"
                    onClick={() => handleSaveEdit(t.id)}
                  >
                    Save Edit
                  </button>

                  {t.adminReply ? (
                    <p className="text-success">
                      <strong>Reply:</strong> {t.adminReply}
                    </p>
                  ) : (
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a reply..."
                        value={replies[t.id] || ""}
                        onChange={(e) =>
                          handleReplyChange(t.id, e.target.value)
                        }
                      />
                      <button
                        className="btn btn-sm btn-success mt-2"
                        onClick={() => handleSendReply(t.id)}
                      >
                        Send Reply
                      </button>
                    </div>
                  )}

                  <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
