import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/img/logo-icon.svg';
import { Link } from 'react-router-dom';
import { handleSubmit } from './Api';
import RecipeCard from './RecipeCard';
import RecipeView from './RecipeView';

const CustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 30;
  console.log("recipe state:", recipes);
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
 
  const deleteRecipe = async (recipeId) => {
    
    // Send a DELETE request to your server to delete the recipe
    axios
      .delete(`/api/delete_recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Update the recipes state to remove the deleted recipe
          setRecipes((prevRecipes) =>
              prevRecipes.filter((recipe) => recipe.id !== recipeId)
            );
        // recipe.filter((recipe) => recipe.id !== recipeId)
        }
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
      });
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(recipes);
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
      <div className='d-flex justify-content-center align-items-center overflow-hidden'>
        <div className='book'></div>
        <div className='custom-options'>
        <div className='w-100 d-flex flex-row justify-between p-2'>
                <button className="btn text-white rounded">
                  <Link className='text-decoration-none text-white' to="/menu">
                    <i style={{color: "#FF7D04"}} className="fa-solid fa-arrow-left fa-xl"></i>
                  </Link>
                </button>
                <div className='w-100 mx-5 text-end'>
                <button className='btn text-white rounded' type="submit" onClick={handleSubmit}>
                  <Link className='text-decoration-none text-white' to="/cookbook">
                    <i style={{color: "#FF7D04"}} className="fa-regular fa-pen-to-square fa-xl"></i>
                  </Link>
                </button>
            </div>
          </div>
          
        </div>
        <ul className="custom-recipes row align-items-center justify-content-center pt-5">
        {Array.isArray(recipes) ? (
          currentRecipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} customRecipeId={recipe.id} showIcon={true} deleteRecipe={deleteRecipe} />
              {/* Include the RecipeView component for each RecipeCard */}
              <RecipeView recipe={recipe} customRecipeId={recipe.id} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        
        </ul>
        {/* <button onClick={nextPage}>
          <i className='fa-light fa-hand-point-right'></i>
        </button> */}
      </div>
   </div>
  );
};

export default CustomRecipes;
