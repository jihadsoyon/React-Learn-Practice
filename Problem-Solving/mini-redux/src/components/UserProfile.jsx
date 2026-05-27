import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const UserProfile = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="card">
      <h3>User Profile</h3>

      <p>Name: {state.user.name}</p>
      <p>Status: {state.user.loggedIn ? "Logged In" : "Logged Out"}</p>
    </div>
  );
};

export default UserProfile;