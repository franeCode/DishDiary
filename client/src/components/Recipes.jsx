import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(8);

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get_recipes', {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
      const data = response.data;
  
      if (Array.isArray(data)) {
        setRecipes(data);
        console.log('Response data:', data)
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  fetchRecipes();
}, []);


  // Get current recipes based on pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log('Current recipes:', currentRecipes);
  console.log('All recipes:', recipes);

  return (
    <div className="app-container relative">
      <div class="recipes-cover"></div>
      <div className="container show-recipe">
        {/* <h1 className="border-bottom shadow text-center py-3">Get Inspiration</h1> */}
        <ul className="row gap-5">
        {Array.isArray(currentRecipes) ? (
            currentRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
          ) : (
            <p>Loading...</p>
          )}
        
        </ul>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center fixed-bottom gap-3">
            {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="pag-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Recipes;
