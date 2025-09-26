import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Eye icons

export default function Signup() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [cnfrmpass, setcnfrmPass] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 👁️ Password visibility states
  const [showPass, setShowPass] = useState(false);
  const [showCnfrmPass, setShowCnfrmPass] = useState(false);

  const RegisterUser = async () => {
    if (!name || !email || !pass || !cnfrmpass || !shopName) {
      alert("Please fill all fields");
      return;
    }
    if (pass !== cnfrmpass) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const auth = getAuth(app);
    const db = getDatabase(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await set(ref(db, "users/" + user.uid), {
        name,
        email,
        shopName,
        isLoggedIn: false,
        createdAt: new Date().toISOString(),
      });

      alert("User registered! Verification email sent.");
      setName("");
      setEmail("");
      setPass("");
      setcnfrmPass("");
      setShopName("");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-200">
      <div className="p-8 shadow-lg rounded-lg w-96 bg-white">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Register Now!
        </h1>

        {/* Name */}
        <div className="mb-4">
          <p className="text-xs text-grey mb-1">Enter Name:</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full h-8 p-2 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <p className="text-xs text-grey mb-1">Email:</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full h-8 p-2 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
        </div>

        {/* Shop Name */}
        <div className="mb-4">
          <p className="text-xs text-grey mb-1">Shop Name:</p>
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Shop Name"
            className="w-full p-2 h-8 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <p className="text-xs text-grey mb-1">Password:</p>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type={showPass ? "text" : "password"} // 👈 Toggle
            placeholder="Password"
            className="w-full p-2 h-8 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer text-grey"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <p className="text-xs text-grey mb-1">Confirm Password:</p>
          <input
            value={cnfrmpass}
            onChange={(e) => setcnfrmPass(e.target.value)}
            type={showCnfrmPass ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-2 h-8 rounded border border-lightGrey placeholder:text-grey focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary bg-textField"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer text-grey"
            onClick={() => setShowCnfrmPass(!showCnfrmPass)}
          >
            {showCnfrmPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit */}
        <button
          onClick={RegisterUser}
          disabled={loading}
          className="w-full h-8 py-2 rounded bg-primary text-white font-semibold hover:bg-secondary transition-colors duration-300"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <div className="text-right mt-2">
          <a
            className="text-sm text-primary hover:text-orange-400 hover:cursor-pointer"
            href="/"
          >
            Already have an account? Login!
          </a>
        </div>
      </div>
    </div>
  );
}
