// src/pages/UserApplicationDashboard.js
import React, { useEffect, useState } from "react";
import "../styles/UserApplicationDashboard.css";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { formFields } from "../utils/formConfig";

const UserApplicationDashboard = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const fetchUserApplications = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "formResponses"),
        where("email", "==", user.email)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserApplications();
  }, [user]);

  const handleEdit = (id) => {
    const toEdit = applications.find((app) => app.id === id);
    setEditingId(id);
    setEditedData(toEdit);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { id, ...data } = editedData;
      await updateDoc(doc(db, "formResponses", id), data);
      setEditingId(null);
      fetchUserApplications();
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "formResponses", id));
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  return (
    <div className="container my-5">
      <div className="bg-light rounded shadow-sm p-4">
        <h3 className="text-primary mb-4">📋 My Submitted Applications</h3>

        {loading ? (
          <p className="text-secondary">⏳ Loading your applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-muted">
            You haven't submitted any applications yet.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle rounded shadow-sm">
              <thead className="table-primary">
                <tr>
                  {formFields
                    .map((f) => f.name)
                    .concat("timestamp")
                    .map((key) => (
                      <th key={key}>{key.toUpperCase()}</th>
                    ))}
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    {formFields
                      .map((f) => f.name)
                      .concat("timestamp")
                      .map((key) => (
                        <td key={key}>
                          {editingId === app.id ? (
                            <input
                              className="form-control"
                              name={key}
                              value={editedData[key] || ""}
                              onChange={handleEditChange}
                            />
                          ) : key === "gender" ? (
                            <span
                              className={`badge ${
                                app[key] === "Male"
                                  ? "bg-info text-dark"
                                  : "bg-danger"
                              }`}
                            >
                              {app[key]}
                            </span>
                          ) : (
                            app[key] || "—"
                          )}
                        </td>
                      ))}
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {editingId === app.id ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={handleSave}
                          >
                            💾 Save
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleEdit(app.id)}
                          >
                            ✏️ Edit
                          </button>
                        )}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(app.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApplicationDashboard;
