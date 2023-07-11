import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/logo-icon.svg';

const Navbar = () => {
  const navigate = useNavigate();
    const handleLogout = () => {
      axios.get('/logout')
        .then(response => {
          if (response.status === 200) {
            // Clear JWT token from client-side storage
            localStorage.removeItem('token');
            navigate('/login');
            console.log('Logout successful');
          } else {
            throw new Error('Logout failed');
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

// Use handleLogout function in your component's JSX
{/* <button onClick={handleLogout}>Logout</button> */}


  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow fs-2">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center logo fs-1" to="/">
          <img src={logo} alt="logo"></img>
          <span>Recipes .</span>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/cookbook">CookBook</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">Get Inspiration</Link>
            </li>
            <li className="nav-item ms-5">
              <button className='px-4 mt-2 rounded text-white fs-3' onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
