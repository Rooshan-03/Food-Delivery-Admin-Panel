import { useLocation } from "react-router-dom";
import Pic from "../assets/react.svg"
export default function Header() {
  const location = useLocation();

  // Map routes to header titles
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
        return "Dashboard"; // Fallback title
    }
  };

  const title = getHeaderTitle(location.pathname);

  return (
    <div className="fixed top-0 left-60 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-10">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, User</span>
        <img src={Pic} alt="profile" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}