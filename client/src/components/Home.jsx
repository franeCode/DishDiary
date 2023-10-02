import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/img/logo-icon.svg';
import { Link } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;

  useEffect(() => {
    console.log("This is a message:", message);
  }, [message]);

  return (
    <div className='app-container home'>
      <div className='home-bg'></div>
      {/* <h1></h1> */}
      {message && <p>{message}</p>}
      <div className='home-container d-flex flex-column justify-content-center align-items-center gap-5'>
      <h1 className='quote'>The kitchen is where the magic happens.</h1>
        <div className='logo-wrapper d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex flex-column align-items-center logo-modal'>
            <img src={logo} alt="logo"></img>
            <span>DishDiary</span>
          </div>
        </div>
        <Link to='/login'>
        <button className='login-btn text-white rounded fs-2'>Start now!</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
