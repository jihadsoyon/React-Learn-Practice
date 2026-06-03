import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>🚀 Drag & Resize Components Builder</h1>
          <p>Custom Dashboard Layout Manager</p>
        </div>
      </header>

      <Dashboard />
    </div>
  );
}

export default App;