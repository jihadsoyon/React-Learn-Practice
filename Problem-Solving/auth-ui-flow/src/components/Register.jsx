import { useState } from "react";
import InputField from "./InputField";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    setError("");
    alert("Registration Successful");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <InputField
        label="Name"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        name="name"
      />

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

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;