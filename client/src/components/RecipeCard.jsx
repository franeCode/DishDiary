import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noImage from "../assets/img/no-image.jpeg";
import axios from "axios";

const RecipeCard = ({ recipe, setRecipes, showIcon, customRecipe, customRecipeId }) => {
  const displayRecipe = recipe || customRecipe;
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (displayRecipe && displayRecipe.id) {
      navigate(`/recipe/${displayRecipe.id}`, { state: { recipe: displayRecipe } });
    }
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

  return (
    <li>
      <div
        className="d-flex flex-row align-items-start justify-content-center rounded-4 shadow position-relative mb-4"
        style={{ width: "100%", height: "15rem", borderColor: "transparent" }}
      >
        {displayRecipe && displayRecipe.image_url ? (
          <img
            src={displayRecipe.image_url}
            className="card-img-top rounded-4 m-3"
            alt="image"
            style={{width: "30%", height: "80%"}}
          />
        ) : (
          <img
            src={noImage}
            className="card-img-top rounded-4 m-3"
            alt="image"
            style={{width: "30%", height: "80%"}}
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
                onClick={() => shareRecipe(customRecipeId, displayRecipe.id)}
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
              onClick={() => handleReadMore()}
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
          </p>
      </div>
    </li>
  );
};

export default RecipeCard;
