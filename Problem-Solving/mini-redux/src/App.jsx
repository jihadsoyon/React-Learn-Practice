import { useContext } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import { AppContext } from "./context/AppContext";

function App() {
  const { state } = useContext(AppContext);

  return (
    <div className={state.theme === "light" ? "app light" : "app dark"}>
      <Navbar />

      <div className="container">
        <UserProfile />
        <Cart />
      </div>
    </div>
  );
}

export default App;