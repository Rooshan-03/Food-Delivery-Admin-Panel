import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, update } from "firebase/database";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ import icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false); // 👈 toggle state

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !pass) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const auth = getAuth(app);
    const db = getDatabase(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      const snapshot = await get(ref(db, "users/" + user.uid));
      if (snapshot.exists()) {
        console.log("User Data:", snapshot.val());
        await update(ref(db, "users/" + user.uid), { isLoggedIn: true });
      } else {
        console.log("No user data found in RTDB.");
      }

      alert("Login successful!");
      navigate("/Home", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-200">
      <div className="p-8 shadow-lg rounded-lg w-96 bg-white">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Welcome Back!
        </h1>

        {/* Email */}
        <div className="mb-4">
          <p className="text-xs text-grey mb-1">Email:</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            type="email"
            className="w-full h-8 p-2 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
        </div>

        {/* Password with Eye Toggle */}
        <div className="mb-6 relative">
          <p className="text-xs text-grey mb-1">Password:</p>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type={showPass ? "text" : "password"} // 👈 toggle type
            placeholder="Enter password"
            className="w-full h-8 p-2 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer text-grey"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-8 py-2 rounded bg-primary text-white font-semibold hover:bg-secondary transition-colors duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <div className="text-right mt-2">
          <a
            className="text-sm text-primary hover:text-orange-400 no-underline hover:cursor-pointer hover:no-underline"
            href="/signup"
          >
            Don’t have an account? Sign up!
          </a>
        </div>
      </div>
    </div>
  );
}
