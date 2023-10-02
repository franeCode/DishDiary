import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noImage from "../assets/img/no-image.jpeg";
import axios from "axios";

const RecipeCard = ({ recipe, setRecipes, showIcon, customRecipeId, ingredients }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  const deleteRecipe = async (recipeId) => {
    axios
      .delete(`/api/delete_recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        
        if (response.status === 200) {
          setRecipes((recipes) =>
          recipes.filter((recipe) => recipe.id !== recipeId));
        }
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  // Function to share a custom recipe with a regular recipe
  const shareRecipe = (customRecipeId, recipeId, formData) => {
    axios
      .post(`/api/share_recipe/${customRecipeId}/${recipeId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.error);
      });
  };

  const displayRecipe = recipe || customRecipeId;

  const displayIngredients = (recipe) => {
    if (typeof recipe.ingredients === 'string') {
      const ingredientsArray = recipe.ingredients.split(', ');
      return ingredientsArray.join(', '); // Join the array back to a string for display
    } else if (Array.isArray(recipe.ingredients)) {
      return recipe.ingredients.join(', '); // If it's already an array, join it
    } else {
      return ''; // Handle other cases gracefully
    }
  };

  // Check if recipe.image_url is an absolute URL (contains http or https)
  // const isAbsoluteURL = /^https?:\/\//i.test(recipe.image_url);

  // const imageSrc = isAbsoluteURL ? recipe.image_url : `${recipe.image_url}`;
  // console.log(recipe.image_url)
  return (
    <div className="col mt-3">
      <div
        className="d-flex flex-row align-items-start justify-content-center rounded-4 shadow position-relative"
        style={{ width: "100%", height: "auto", borderColor: "transparent" }}
      >
        {/* <div className="lines" style={{minHeight: "14rem", marginTop: "0.5rem"}}></div> */}
        {displayRecipe && displayRecipe.image_url ? (
          <img
            src={displayRecipe.image_url}
            className="card-img-top rounded-4 m-3"
            alt="image"
            style={{width: "38%", height: "80%"}}
          />
        ) : (
          <img
            src={noImage}
            className="card-img-top rounded-4 m-3"
            alt="image"
            // style={{width: "14rem", height: "13rem"}}
            style={{width: "40%", height: "80%"}}
          />
        )}
        <div className="card-body my-3 p-2">
          <h5 className="card-title fs-4">
            {displayRecipe ? displayRecipe.title : "No title available"}
          </h5>
          <p className="border-card"></p>
          <p className="fs-6 overflow-hidden mb-0" style={{ height: "1.5rem" }}>

            Ingredients:{" "}
            <span style={{ fontSize: "0.8rem" }}>
            {displayRecipe.ingredients}
            </span>
          </p>
          <p className="border-card"></p>
          <p className="fs-6 overflow-y-hidden mb-0" style={{ height: "5rem" }}>
            Instructions:{" "}
            <span style={{ fontSize: "0.8rem" }}>
              {displayRecipe ? displayRecipe.instructions : ""}
            </span>
            <span>...</span>
          </p>
          
          
        </div>
        <p className="d-flex flex-column justify-content-around align-items-center border-start p-3 card-text" style={{width: "20%", height: "100%"}}>
          {showIcon && (
              <button
                className="btn rounded bg-transparent p-2"
                onClick={() => shareRecipe(customRecipeId, recipe.id)}
              >
                <Link
                  className="text-decoration-none text-white"
                  to="/custom_recipes"
                >
                  <i
                    className="fa-solid fa-share fa-lg"
                    style={{ color: "#414448" }}
                  ></i>
                </Link>
              </button>
            )}
            <button
              className="btn bg-transparent rounded"
              type="button"
              onClick={() => handleReadMore(displayRecipe.id)}
            >
              <i
                className="fa-solid fa-info fa-lg"
                style={{ color: "var(--text-color)" }}
              ></i>
            </button>
            {showIcon && (
              <button
                className="btn text-white rounded"
                type="submit"
                onClick={() => deleteRecipe(displayRecipe.id)}
              >
                <Link
                  className="text-decoration-none text-white"
                  to="/custom_recipes"
                >
                  <i className="fa-solid fa-trash fa-lg" style={{ color: "#414448" }}></i>
                </Link>
              </button>
            )}
            {/* <span>Written by: {displayRecipe.user_id}</span> */}
          </p>
          {/* <div className="holes hole-top" style={{width: "20px", height: "20px",}}></div>
          <div className="holes hole-middle" style={{width: "20px", height: "20px",}}></div>
          <div className="holes hole-bottom" style={{width: "20px", height: "20px",}}></div> */}
      </div>
    </div>
  );
};

export default RecipeCard;
