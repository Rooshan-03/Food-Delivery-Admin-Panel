import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

export default function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <div className="flex-1 ml-60">
          {/* Fixed Header */}
          <Header />

          {/* Main content with padding to offset header */}
          <div className="pt-16 px-6 min-h-screen">
            <Routes>
              <Route path="/Home" element={<h1 className="text-2xl">Home</h1>} />
              <Route path="/Settings" element={<h1 className="text-2xl">Settings</h1>} />
              <Route path="/Profile" element={<h1 className="text-2xl">Profile</h1>} />
              <Route path="/Update" element={<h1 className="text-2xl">Update</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}