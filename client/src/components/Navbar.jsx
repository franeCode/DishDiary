import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/logo-icon.svg';

const Navbar = () => {
  const navigate = useNavigate();
    // const handleLogout = () => {
    //   axios.get('/logout')
    //     .then(response => {
    //       if (response.status === 200) {
    //         // Clear JWT token from client-side storage
    //         localStorage.removeItem('token');
    //         navigate('/login');
    //         console.log('Logout successful');
    //       } else {
    //         throw new Error('Logout failed');
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // };

    const handleLogout = () => {
      axios.get('/logout')
        .then(response => {
          if (response.status === 200) {
            // Clear JWT token from client-side storage
            localStorage.removeItem('access_token'); // Use the correct key
            navigate('/login');
            console.log('Logout successful');
          } else {
            console.error('Logout failed: Unexpected status code');
          }
        })
        .catch(error => {
          console.error('Logout failed:', error.message); // Provide a more informative error message
        });
    };


  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow fs-2">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fs-1" to="/">
        <div className="logo">
            <span>DishDiary</span>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav fs-4">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cookbook">CookBook</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">Get Inspiration</Link>
            </li>
            <li className="nav-item ms-5">
              <button className='btn px-3 rounded text-white fs-4' style={{backgroundColor: "#FF7D04"}} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
