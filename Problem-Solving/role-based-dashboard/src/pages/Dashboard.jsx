import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <h2>Role: {user.role}</h2>
    </div>
  );
}

export default Dashboard;