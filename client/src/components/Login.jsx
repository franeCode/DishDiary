import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const logInUser = () => {
    axios.post('http://localhost:5000/login', {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response.data)
      console.log(response.headers); // Log the response headers
      const jwtToken = response.data.access_token;
      if (jwtToken) {
        console.log(jwtToken)
        localStorage.setItem('access_token', jwtToken); // Store the JWT token in local storage
        axios.get('http://localhost:5000/api/get_recipes', {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        })
          .then(response => {
            console.log(response);
            const jwtToken = localStorage.getItem('access_token');
            navigate("/cookbook", { state: { message: `${username} logged in successfully!` } });
          })
          .catch(error => {
            if (error.response && error.response.data && error.response.data.error) {
              setErrorMessage(error.response.data.error);
            } else {
              setErrorMessage('An error occurred during login!');
            }
          });
      } else {
        alert("Access token not found");
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred during login!');
      }
    });
  }

  
  return (
    <div>
      <div className='app-container home'>
      <div className='home-bg'></div>
        <div className="home-container d-flex flex-column justify-content-center align-items-center">
          <div className="login-wrapper relative">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {/* <div className=""> */}
              <form className="d-flex flex-column justify-content-center align-items-center rounded py-4 gap-2">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                </div>

                <div className="form-outline mb-4">
                  <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" placeholder="Enter a valid username" />
                </div>

                <div className="form-outline mb-3">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" placeholder="Enter password" />
                </div>

                {/* <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" />
                    <label className="form-check-label">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Forgot password?</a>
                </div> */}

                <div className="text-center text-lg-start">
                  <button type="button" className="px-4 rounded fs-4" onClick={logInUser}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                </div>
              </form>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
