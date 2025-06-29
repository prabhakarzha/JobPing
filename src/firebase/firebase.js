// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUG9vS0J5nihvatL18QKeUrkJXYhphobI",
  authDomain: "authproject-ef091.firebaseapp.com",
  projectId: "authproject-ef091",
  storageBucket: "authproject-ef091.appspot.com", // ✅ fixed the domain typo here
  messagingSenderId: "128408669237",
  appId: "1:128408669237:web:ff6c9ac6259a02aabb757c",
  measurementId: "G-ET9L1LDNC0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
