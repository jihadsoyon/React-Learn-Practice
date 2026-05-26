import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="container">
      <h1>🔐 Authentication UI Flow</h1>

      <div className="auth-wrapper">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default App;