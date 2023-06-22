import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Hero from './Hero';
import CookBook from './CookBook';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeView = () => {
        const location = useLocation();  
        const { recipe } = location.state || {}; 
        const navigate = useNavigate();
        // const [favoriteRecipes, setFavoriteRecipes] = useState([]);


        // const addToFavorites = (recipe) => {
        //   axios.post('/api/favorites', { recipe }, { withCredentials: true })
        //     .then(response => {
        //       // Handle the successful addition of the recipe to favorites
        //       console.log('Recipe added to favorites:', response.data);
        //       setFavoriteRecipes([...favoriteRecipes, recipe]); // Update the favorite recipes state
        //       navigate('/my-recipes'); // Redirect to the MyRecipes component
        //     })
        //     .catch(error => {
        //       // Handle error if the request fails
        //       console.log('Error adding recipe to favorites:', error);
        //     });
        // };

     


  if (!recipe) {
    return <div>No recipe data available.</div>;
  }
      

  return (
    
        <div className='page d-flex justify-content-center align-items-center relative'>
        <div className='book'></div>
        <div className='book-page relative'>
          <div className="lines"></div>
            <div className="list">
              <h1>{recipe.title}</h1>
              <ul>Ingredients:
              <li className='text-decoration-none'>{recipe.ingredients}</li>
              </ul>
              <p className='instructions fs-6' style={{color: '#282727'}}>{recipe.instructions}</p>
            </div>
            <div className="holes hole-top"></div>
              <div className="holes hole-middle"></div>
              <div className="holes hole-bottom"></div>
        </div>
       
      
      {/* <div className='container'>
      <ul>Ingredients:
        <li>{recipe.ingredients}</li>
      </ul>

      <div className='detail-info text-light'>
        <p className='fs-6' style={{color: '#282727'}}>{recipe.instructions}</p>
      </div> */}
      
{/* <button onClick={() => addToFavorites(recipe)}> */}
          {/* Add to Favorites
        </button> */}
      {/* <img src={recipe.image_url} alt="Recipe Image" /> */}
      <a href={`https://www.youtube.com/embed/${recipe.youtube_link}`}>Watch Video</a>
      </div>
    // </div>
  );
};

export default RecipeView;