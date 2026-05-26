import { useState } from "react";
import InputField from "./InputField";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setError("");
    alert("Login Successful");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        name="email"
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        name="password"
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;