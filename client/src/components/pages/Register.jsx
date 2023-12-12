import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = () => {
    axios
      .post(
        "/api/register",
        {
          username: username,
          password: password,
          confirmation: confirmation,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response);
        navigate("/login", {
          state: { message: `${username} registered successfully!` },
        });
      })
      .catch(function (error) {
        console.log(error, "error");
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An error occurred during registration!");
        }
      });
  };

  return (
    <div className="app-container home">
      <div className="home-bg"></div>
      <div className="home-container d-flex flex-column justify-content-center align-items-center">
        <div className="login-wrapper relative">
          <div className="container-fluid py-5 text-center">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form className="d-flex flex-column justify-content-center align-items-center rounded py-4 gap-3">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead mb-2 me-3">Register Account</p>
              </div>
              <div className="form-outline mb-4">
              <input
                autoComplete="off"
                autoFocus
                className="form-control form-control-lg"
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
                </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  id="confirmation"
                  name="confirmation"
                  placeholder="Confirm password"
                  type="password"
                  onChange={(e) => setConfirmation(e.target.value)}
                ></input>
              </div>
              <div className="text-center text-lg-start">
                <button
                  className="px-4 rounded text-white fs-5"
                  type="button"
                  onClick={() => registerUser()}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <a href="/login" style={{ color: "#FF7D04" }}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
