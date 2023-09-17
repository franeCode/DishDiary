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
              <input className='border-none fs-3 w-75' type="text" name='title' value={recipe.title} onChange={handleInputChange} placeholder='Title' />
              <input className='flex word-wrap w-75' type="text" name='ingredients' value={recipe.ingredients} onChange={handleInputChange} placeholder='Ingredients' />
              <textarea className='border-none w-75' type="text" name='instructions' value={recipe.instructions} onChange={handleInputChange} placeholder='Instructions' />
            </form>
            <div className='d-flex flex-column gap-5 position-absolute top-50 end-0 translate-middle-y pe-5'>
                <button className="btn text-white rounded">
                  <Link className='text-decoration-none text-white' to="/cookbook">
                    <i style={{color: "#FF7D04"}} class="fa-solid fa-arrow-left fa-xl"></i>
                  </Link>
                </button>
                <button className='btn text-white rounded' type="submit" onClick={handleSubmit}>
                  <Link className='text-decoration-none text-white' to="/cookbook">
                    <i style={{color: "#FF7D04"}} class="fa-regular fa-pen-to-square fa-xl"></i>
                  </Link>
                </button>
                <button className='btn rounded bg-transparent'>
                  <Link className='text-decoration-none text-white' to="/custom_recipes">
                    <i style={{color: "#FF7D04"}} class="fa-regular fa-eye fa-xl"></i>
                  </Link>
                </button>
                <button className='btn text-white rounded' type="submit" onClick={handleSubmit}>
                  <i style={{color: "#FF7D04"}} class="fa-solid fa-check fa-xl"></i>
                </button>
              </div>
              {/* <div className="position-absolute top-0">
                <i class="fa-solid fa-left-long"></i>
              </div> */}
              <div className="holes hole-top"></div>
              <div className="holes hole-middle"></div>
              <div className="holes hole-bottom"></div>
          </div>
        
        </div>
        
        
    </div>
  );
};

export default CookBook;
