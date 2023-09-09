import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import { useAuth } from "../../hooks/auth";

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.register(formData.username, formData.password);
      setErrorMessage("");
      navigate("/signin", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Login Here</Link>
      </p>
    </div>
  );
};

export default Register;
