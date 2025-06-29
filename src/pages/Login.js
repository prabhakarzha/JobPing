// Login.js
import React, { useState } from "react";
import firebase from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      if (email === "sonukashyap116@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/form");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Login
        </Typography>
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              label="Email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
