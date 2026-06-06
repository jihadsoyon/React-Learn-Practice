import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/dashboard">
        Dashboard
      </Link>

      {user?.role === "admin" && (
        <Link to="/admin">
          Admin Panel
        </Link>
      )}

      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;