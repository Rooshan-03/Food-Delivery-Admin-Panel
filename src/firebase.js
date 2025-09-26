import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8APvdXE7fmXoRLlvZjEJrmgxdJViPE1s",
  authDomain: "meter-1312dadd.firebaseapp.com",
  projectId: "securemeter-1312dadd",
  storageBucket: "securemeter-1312dadd.firebasestorage.app",
  messagingSenderId: "1032308339288",
  appId: "1:1032308339288:web:519035d08d092fd825102d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
