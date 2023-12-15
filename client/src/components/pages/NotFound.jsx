import React from 'react';
import Footer from '../Footer';

const NotFound = () => {
  return (
    <>
    <div className='mx-auto text-center mt-5'>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
    <Footer />
    </>
  );
};

export default NotFound;