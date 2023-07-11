import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios.get('/api/get_custom_recipes', {
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

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center relative'>
        <div className='book'></div>
        <button>
        <i className="fa-light fa-hand-back-point-left"></i>
        </button>
        <div className='book-page relative'>
          <div className="lines"></div>
            <div className="list">
            <div className="holes hole-top"></div>
              <div className="holes hole-middle"></div>
              <div className="holes hole-bottom"></div>
      <ul> My Recipe Book
        {recipes.map(recipe => (
          <Link to={''} key={recipe.id}>
          <li key={recipe.id}>
            <h3 className='lh-1'>{recipe.id}. {recipe.title}</h3>
          </li>
          </Link>
        ))}
      </ul>
      </div>
      </div>
      </div>
    </div>
  );
};

export default CustomRecipes;
