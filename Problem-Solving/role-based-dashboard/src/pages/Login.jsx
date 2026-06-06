import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h1>Select Role</h1>

      <button onClick={() => handleLogin("user")}>
        Login as User
      </button>

      <button onClick={() => handleLogin("admin")}>
        Login as Admin
      </button>
    </div>
  );
}

export default Login;