import * as React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./login.css";
import { useAuth } from "../../hooks/auth";

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signin(formData.username, formData.password);
      setErrorMessage("");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <p>You must log in to view shops and its products</p>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Register Here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
