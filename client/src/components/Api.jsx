import axios from 'axios';
import { useState } from 'react';

export const handleSubmit = async (recipe, navigate) => {
  try {
        const resp = await axios
            .post('/api/add_recipe', recipe, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
        const data = resp.data;
        navigate('/cookbook');
    } catch (err) {
        console.log(err);
    }
};

export const deleteRecipe = async (recipe, recipeId) => {
    
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
        //   setRecipes((prevRecipes) =>
        //     prevRecipes.filter((recipe) => recipe.id !== recipeId)
        //   );
        recipe.filter((recipe) => recipe.id !== recipeId)
        }
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
      });
  };

// export default Api;