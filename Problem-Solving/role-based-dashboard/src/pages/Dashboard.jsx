import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome Back 👋</h1>
          <p>Logged in as: {user.role}</p>
        </div>

        <div className="stats-grid">
          <div className="card">
            <h3>Total Users</h3>
            <h2>1,245</h2>
          </div>

          <div className="card">
            <h3>Revenue</h3>
            <h2>$12,450</h2>
          </div>

          <div className="card">
            <h3>Active Sessions</h3>
            <h2>540</h2>
          </div>

          <div className="card">
            <h3>Projects</h3>
            <h2>32</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;