import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/img/logo-icon.svg';
import { Link } from 'react-router-dom';

const CustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios
      .get('/api/get_custom_recipes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Calculate the index of the last recipe to display on the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  // Calculate the index of the first recipe to display on the current page
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  // Get the recipes to display on the current page
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Function to handle going to the next page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle going to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center relative'>
        <div className='book'></div>
        {/* <button onClick={prevPage}>
          <i className='fa-light fa-hand-back-point-left'></i>
        </button> */}
        <div className='book-page relative'>
          <div className='lines'></div>
          <div className='list'>
            <div className='holes hole-top'></div>
            <div className='holes hole-middle'></div>
            <div className='holes hole-bottom'></div>
            <ul>
            <div className="logo text-center pt-2">
              <span className='fs-3 text-black'>My DishDiary</span>
              <img src={logo} alt="logo"></img>
            </div>
              {currentRecipes.map(recipe => (
                <Link className='text-decoration-none text-black fs-4' to={''} key={recipe.id}>
                  <li className='d-flex justify-content-between' key={recipe.id}>
                    <h3 style={{lineHeight: "0.5rem"}}>
                      {recipe.id}. {recipe.title}
                    </h3>
                    <i class="fa-regular fa-trash-can"></i>
                  </li>
                </Link>
              ))}
            </ul>
            <div className='d-flex justify-content-around'>
              <button style={{backgroundColor: "#FF7D04"}} className='btn rounded' onClick={prevPage}>
                <i class="fa-solid fa-arrow-left text-white"></i>
              </button>
              <button style={{backgroundColor: "#FF7D04"}} className='btn rounded' onClick={nextPage}>
                <i class="fa-solid fa-arrow-right text-white"></i>
              </button>
            </div>
          </div>
        </div>
        {/* <button onClick={nextPage}>
          <i className='fa-light fa-hand-point-right'></i>
        </button> */}
      </div>
    </div>
  );
};

export default CustomRecipes;
