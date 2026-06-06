import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;