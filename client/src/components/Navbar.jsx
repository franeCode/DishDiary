import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("username");
          navigate("/login");
          console.log("Logout successful");
        } else {
          console.error("Logout failed: Unexpected status code");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow px-lg-5 fs-2">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand d-flex align-items-center fs-1">
          <div style={{ width: "8rem" }}>
            <img src={logo} alt="logo"></img>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center p-2 fs-4">
            <li className="nav-item">
              <Link className="nav-link" to="/custom_recipes">
                CookBook
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">
                Inspiration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shared">
              DishMate
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="px-3 rounded fs-4"
                style={{ backgroundColor: "transparent", color: "#555" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
