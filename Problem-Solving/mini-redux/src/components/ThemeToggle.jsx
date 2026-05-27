import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ThemeToggle = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      className="btn"
    >
      {state.theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;