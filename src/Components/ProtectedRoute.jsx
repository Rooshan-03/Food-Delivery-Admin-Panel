import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snapshot = await get(ref(db, "users/" + user.uid));
          if (snapshot.exists() && snapshot.val().isLoggedIn) {
            setAllowed(true);
          } else {
            setAllowed(false);
          }
        } catch (error) {
          console.error("Error checking isLoggedIn:", error);
          setAllowed(false);
        }
      } else {
        setAllowed(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-20">Checking auth...</h1>;
  }

  return allowed ? children : <Navigate to="/" replace />;
}
