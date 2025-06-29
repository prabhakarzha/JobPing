// routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, isAdmin, children }) => {
  if (user === undefined || isAdmin === undefined) {
    return <div>Loading...</div>;
  }

  if (!user || isAdmin) {
    return <Navigate to="/" replace />;
  }
  if (user && !user.email) {
    return <div>⏳ Authenticating user details...</div>;
  }

  return children;
};

export default ProtectedRoute;
