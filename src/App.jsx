import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute"; // 👈 import
import Update from "./Pages/Update";
import Profile from "./Pages/Profile"
import Home from "./Pages/Home";
import Setting from "./Pages/Setting"
function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="pt-16 px-6 min-h-screen">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Home/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Setting/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Update/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
