import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        RB Dashboard
      </div>

      <div className="nav-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin">
            Admin Panel
          </Link>
        )}

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;