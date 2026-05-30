import ToggleDemo from "./components/ToggleDemo";
import LocalStorageDemo from "./components/LocalStorageDemo";
import DebounceDemo from "./components/DebounceDemo";
import FetchDemo from "./components/FetchDemo";
import OutsideClickDemo from "./components/OutsideClickDemo";

function App() {
  return (
    <div className="container">
      <h1 className="title">
        🚀 Reusable Custom Hooks Library
      </h1>

      <div className="grid">
        <ToggleDemo />
        <LocalStorageDemo />
        <DebounceDemo />
        <FetchDemo />
        <OutsideClickDemo />
      </div>
    </div>
  );
}

export default App;