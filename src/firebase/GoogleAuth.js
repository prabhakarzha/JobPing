// GoogleAuth.js
import React from "react";
import firebase from "./firebase";
import "firebase/auth";

const GoogleAuth = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-box" style={{ textAlign: "center", marginTop: "100px" }}>
      <h3>Login with Google</h3>
      <button onClick={signInWithGoogle} style={{ padding: "10px 20px", fontSize: "16px" }}>Sign in with Google</button>
    </div>
  );
};

export default GoogleAuth;