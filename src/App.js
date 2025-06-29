import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import JobApplicationForm from "./components/SubmitApplication";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import MyApplicationPage from "./pages/UserApplicationDashboard";
import SuccessPage from "./pages/SuccessPage";
import TestimonialForm from "./components/TestimonialForm";
import AdminTestimonials from "./components/AdminTestimonials";
import TestimonialsPage from "./pages/TestimonialsPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";

const ADMIN_EMAIL = "sonukashyap116@gmail.com";

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
        });

        setIsAdmin(currentUser.email === ADMIN_EMAIL);

        // ✅ Navigate to Landing Page after login
        navigate("/");
      } else {
        setUser(null);
        setIsAdmin(false);
      }

      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return <div>Authenticating user...</div>;
  }

  const showNavbar = user && location.pathname !== "/admin";

  return (
    <>
      {showNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/form"
          element={
            <ProtectedRoute user={user} isAdmin={isAdmin}>
              <JobApplicationForm user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute user={user} isAdmin={isAdmin}>
              <AdminPage user={user} />
            </AdminRoute>
          }
        />
        <Route path="/success-page" element={<SuccessPage user={user} />} />
        <Route path="/share-feedback" element={<TestimonialForm />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route
          path="/admin-testimonials"
          element={
            <AdminRoute user={user} isAdmin={isAdmin}>
              <AdminTestimonials />
            </AdminRoute>
          }
        />
        <Route
          path="/my-application"
          element={
            <ProtectedRoute user={user} isAdmin={isAdmin}>
              <MyApplicationPage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
