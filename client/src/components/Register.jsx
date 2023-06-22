// Register.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const registerUser = () => {
    axios.post('http://127.0.0.1:5000/register', {
      username: username,
      password: password
    }, 
    {
      headers: { 'Content-Type': 'application/json' } 
    })
      .then(function (response) {
        console.log(response);
        navigate("/login", { state: { message: `${username} registered successfully!` } });
      })
      .catch(function (error) {
        console.log(error, 'error');
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An error occurred during registration!');
        }
      });
  }

  return ( 
    <div className="app-container home">
      <div className='home-bg'></div>
        <div className="home-container d-flex flex-column justify-content-center align-items-center">
          <div className="login-wrapper relative">
    <div className="container-fluid py-5 text-center">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <div className="mb-3">
        <input autoComplete="off" autoFocus className="form-control mx-auto w-auto" id="username" name="username" placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div className="mb-3">
        <input className="form-control mx-auto w-auto" id="password" name="password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button className="" type="button" onClick={() => registerUser()}>Register</button>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Register;
