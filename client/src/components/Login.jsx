import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const logInUser = () => {
    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const jwtToken = response.data.access_token;
        if (jwtToken) {
          localStorage.setItem("access_token", jwtToken);
          axios
            .get("http://localhost:5000/api/get_recipes", {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .then((response) => {
              console.log(response);
              navigate("/menu", {
                state: { message: `${username} logged in successfully!` },
              });
            })
            .catch((error) => {
              if (
                error.response &&
                error.response.data &&
                error.response.data.error
              ) {
                setErrorMessage(error.response.data.error);
              } else {
                setErrorMessage("An error occurred during login!");
              }
            });
        } else {
          alert("Access token not found");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An error occurred during login!");
        }
      });
  };

  return (
    <div>
      <div className="app-container home">
        <div className="home-bg"></div>
        <div className="home-container d-flex flex-column justify-content-center align-items-center">
          <div className="login-wrapper relative">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form className="d-flex flex-column justify-content-center align-items-center rounded py-4 gap-3">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead mb-2 me-3">Log Into Your Account</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Username"
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
              </div>
              <div className="text-center text-lg-start">
                <button
                  type="button"
                  className="px-4 rounded text-white fs-4"
                  onClick={logInUser}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="/register" style={{ color: "#FF7D04" }}>
                    Register
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

export default Login;
