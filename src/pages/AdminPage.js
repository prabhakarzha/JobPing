// 🔄 AdminPage.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

import {
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
  Box,
  Stack,
  Container,
  Divider,
} from "@mui/material";
import jsPDF from "jspdf";

const AdminPage = ({ user }) => {
  const navigate = useNavigate();
  const [formDataList, setFormDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchFormData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "formResponses"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFormDataList(data);
    } catch (err) {
      console.error("Error fetching form data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchFormData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "formResponses", id));
      setFormDataList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDownload = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("User Application Details", 10, 10);
    doc.text(`First Name: ${data.firstName || "-"}`, 10, 20);
    doc.text(`Last Name: ${data.lastName || "-"}`, 10, 30);
    doc.text(`Email: ${data.email || "-"}`, 10, 40);
    doc.text(`Address: ${data.address || "-"}`, 10, 50);
    doc.text(`Gender: ${data.gender || "-"}`, 10, 60);
    doc.text(`Salary: ${data.salary || "-"}`, 10, 70);
    doc.text(`Resume: ${data.resume || "-"}`, 10, 80);
    doc.save(`${data.firstName}_${data.lastName}_details.pdf`);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* HEADER BAR */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color="primary"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Admin Dashboard
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin-testimonials")}
              sx={{
                textTransform: "none",
                borderRadius: "6px",
              }}
            >
              📢 Manage Testimonials
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{
                fontSize: "0.7rem",
                padding: "4px 10px",
                minWidth: "auto",
                lineHeight: 1.2,
                textTransform: "none",
                borderRadius: "6px",
              }}
            >
              Logout
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* TABLE */}
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  {[
                    "First Name",
                    "Last Name",
                    "Email",
                    "Address",
                    "Gender",
                    "Salary",
                    "Resume",
                    "Actions",
                  ].map((head) => (
                    <TableCell
                      key={head}
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formDataList.map((data) => (
                  <TableRow key={data.id} hover>
                    <TableCell>{data.firstName || "-"}</TableCell>
                    <TableCell>{data.lastName || "-"}</TableCell>
                    <TableCell>{data.email || "-"}</TableCell>
                    <TableCell>{data.address || "-"}</TableCell>
                    <TableCell>{data.gender || "-"}</TableCell>
                    <TableCell>{data.salary || "-"}</TableCell>
                    <TableCell>
                      {data.resume ? (
                        <a
                          href={data.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#1976d2",
                            textDecoration: "underline",
                          }}
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(data.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleDownload(data)}
                        >
                          Download
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!loading && <AnalyticsDashboard formDataList={formDataList} />}
        {/* 
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 6 }}
        >
          Designed & Developed by Prabhakar Kumar — Powered by React + Firebase
          🔥
        </Typography> */}
      </Container>
    </Box>
  );
};

export default AdminPage;
