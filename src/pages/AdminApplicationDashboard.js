// src/pages/AdminApplicationDashboard.js
import React, { useState, useEffect } from "react";
import "../styles/JobApplicationForm.css";

import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { formFields } from "../utils/formConfig";

const AdminApplicationDashboard = () => {
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all submitted applications
  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "formResponses"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  // Delete an application
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "formResponses", id));
      setAllApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  // Download specific user’s data as CSV
  const downloadCSV = (name) => {
    const userData = allApplications.filter(
      (app) => app.firstName.toLowerCase() === name.toLowerCase()
    );

    if (userData.length === 0) return;

    const csvHeader = Object.keys(userData[0]).join(",") + "\n";
    const csvRows = userData
      .map((app) =>
        Object.values(app)
          .map((v) => `"${v || ""}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_application.csv`;
    a.click();
  };

  return (
    <div className="job-application-form container my-4">
      <h2 className="mb-3">All Submitted Applications (Admin View)</h2>
      {loading ? (
        <p>⏳ Loading applications...</p>
      ) : allApplications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {formFields
                  .map((f) => f.name)
                  .concat(["timestamp", "uid"])
                  .map((key) => (
                    <th key={key}>{key.toUpperCase()}</th>
                  ))}
                <th>ACTION</th>
                <th>CSV</th>
              </tr>
            </thead>
            <tbody>
              {allApplications.map((app, index) => (
                <tr key={app.id}>
                  {formFields
                    .map((f) => f.name)
                    .concat(["timestamp", "uid"])
                    .map((key) => (
                      <td key={key}>{app[key] || "—"}</td>
                    ))}
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(app.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => downloadCSV(app.firstName)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminApplicationDashboard;
