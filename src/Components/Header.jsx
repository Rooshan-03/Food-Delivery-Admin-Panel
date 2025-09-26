// components/Header.js
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Pic from "../assets/react.svg";
import { auth } from "../firebase";
import { getUserData } from "../../services/GetUserData";

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const crntuser = auth.currentUser;
      if (crntuser) {
        const data = await getUserData(crntuser.uid);
        setUser(data);
      }
      setLoading(false);
    }
    fetchUser();
  }, [auth.currentUser]);

  const getHeaderTitle = (pathname) => {
    switch (pathname) {
      case "/Home":
        return "Home";
      case "/Settings":
        return "Settings";
      case "/Profile":
        return "User Profile";
      case "/Update":
        return "Updates";
      default:
        return "Dashboard";
    }
  };

  const title = getHeaderTitle(location.pathname);

  return (
    <div className="fixed top-0 left-60 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-10">
      {/* Page Title on the left */}
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      
      {/* Shop Name in the center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-2xl font-mono text-blue-500 font-extrabold">
          {loading ? "Loading..." : user?.shopName || "Shop Name"}
        </span>
      </div>
      
      {/* User info on the right */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Welcome, {loading ? "Loading..." : user?.name || "User"}
        </span>
        <img src={Pic} alt="profile" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}