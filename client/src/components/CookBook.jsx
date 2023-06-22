import React, { useState } from 'react';
import axios from 'axios';
import CustomRecipes from './CustomRecipes';
import { Link, useNavigate } from 'react-router-dom';

const CookBook = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({...recipe, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/add_recipe',  recipe , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then(resp => {
      const data = resp.data
      setRecipe({ title: '', ingredients: '', instructions: '' });
      navigate('/cookbook');
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h2>My Favorite Recipes</h2>
      <div className='d-flex justify-content-center align-items-center relative'>
        <div className='book'></div>
        <div className='book-page relative'>
          <div className="lines"></div>
            <form className="list">
              <input className='border-none fs-3' type="text" name='title' value={recipe.title} onChange={handleInputChange} placeholder='Title' />
              <input className='flex word-wrap' type="text" name='ingredients' value={recipe.ingredients} onChange={handleInputChange} placeholder='Ingredients' />
              <textarea className='border-none' type="text" name='instructions' value={recipe.instructions} onChange={handleInputChange} placeholder='Instructions' />
              <button type="submit" onClick={handleSubmit}>Add Recipe
              </button>
              <button>
                <Link to="/custom_recipes">View Recipes</Link>
              </button>
            </form>
            <div className="holes hole-top"></div>
              <div className="holes hole-middle"></div>
              <div className="holes hole-bottom"></div>
        </div>
        
        </div>
        
        
    </div>
  );
};

export default CookBook;
