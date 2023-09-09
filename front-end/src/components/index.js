import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="header">
        <h1 className="title">REST APIs with Flask and Python</h1>
        <p className="course-info">An Udemy Course by Learn with Pratap</p>
      </div>

      <div className="social-links">
        <a
          href="https://www.youtube.com/learnpratap"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube: @learnpratap
        </a>
        <a
          href="https://www.instagram.com/learnpratap"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram: @learnpratap
        </a>
        <a
          href="https://www.tiktok.com/@learnpratap"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tiktok: @learnpratap
        </a>
      </div>

      <p className="website">
        Website:{" "}
        <a
          href="https://pratapsharma.io/learnwithpratap"
          target="_blank"
          rel="noopener noreferrer"
        >
          pratapsharma.io/learnwithpratap
        </a>
      </p>

      <div className="nav-links">
        <Link to="/shop">Shops</Link>
        {auth.isLoggedIn ? (
          <span
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() =>
              auth.signout(() => {
                navigate("/");
              })
            }
          >
            Logout
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Home;
