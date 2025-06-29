// routes/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, isAdmin, children }) => {
  if (user === undefined || isAdmin === undefined) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
