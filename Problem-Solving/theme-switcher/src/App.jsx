import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="container">
      <h1>🌗 Theme Switcher</h1>

      <p>
        Toggle between light and dark mode with smooth transition and
        localStorage support.
      </p>

      <ThemeToggle />
    </div>
  );
}

export default App;