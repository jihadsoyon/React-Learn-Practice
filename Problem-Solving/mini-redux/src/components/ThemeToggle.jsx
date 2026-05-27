import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ThemeToggle = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <button
      className="btn theme-btn"
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
    >
      {state.theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
    </button>
  );
};

export default ThemeToggle;