import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noImage from "../assets/img/no-image.jpeg";
import axios from "axios";
import RecipeView from "./RecipeView"; 

const RecipeCard = ({
  recipe,
  showIcon,
  customRecipeId,
  deleteRecipe,
  isEditing,
  setIsEditing,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();


  // Function to share a custom recipe with a regular recipe
  const shareRecipe = (customRecipeId, recipeId) => {
    // Create a FormData object to send data as multipart/form-data
    const formData = new FormData();

    // Add customRecipeId and recipeId to the FormData
    formData.append("customRecipeId", customRecipeId);
    formData.append("recipeId", recipeId);

    // Send the POST request to share the recipe
    axios
      .post(`/api/share_recipe/${customRecipeId}/${recipeId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        // Handle success
        console.log(response.data.message);
        // You can also update your UI to reflect the successful sharing action
      })
      .catch((error) => {
        // Handle error
        console.error(error.response.data.error);
      });
  };

  const handleInfoIconClick = (recipe) => {
    if (recipe && recipe.id) {
      navigate(`/recipe/${recipe.id}`, { state: { recipe } });
    }
    setSelectedRecipe(recipe);
  };

  const handleDeleteClick = () => {
    deleteRecipe(recipe.id);
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mt-5">
      <div
        className="card align-items-center rounded-4 shadow-sm mb-5 position-relative"
        style={{ width: "18rem", height: "25rem", borderColor: "transparent" }}
      >
        {recipe.image_url ? (
          <img
            src={recipe.image_url}
            className="card-img-top rounded-top-4"
            alt="image"
          />
        ) : (
          <img
            src={noImage}
            className="card-img-top rounded-top-4"
            alt="image"
          />
        )}
        <div className="card-body pt-0">
          <h5 className="card-title fs-4">
            {recipe.title || "No title available"}
          </h5>
          <p className="fs-6 overflow-hidden mb-0" style={{ height: "1.5rem" }}>
            INGREDIENTS:{" "}
            <span style={{ fontSize: "0.8rem" }}>
              {recipe.measure}
              {recipe.ingredients}
            </span>
          </p>
          <p className="d-flex justify-content-start align-items-center gap-4 card-text">
            <Link
              className="text-decoration-none text-white"
              to="/recipe/recipe:id"
            >
              <button
                className="btn bg-transparent rounded"
                type="button"
                onClick={() => handleInfoIconClick(recipe)}
              >
                <i
                  className="fa-solid fa-info fa-lg"
                  style={{ color: "#FF7D04" }}
                ></i>
              </button>
            </Link>
            {showIcon && !isEditing && (
              <button
                className="btn rounded bg-transparent position-absolute top-0 end-0 p-2"
                onClick={() => shareRecipe(customRecipeId, recipe.id)}
              >
                <Link
                  className="text-decoration-none text-white"
                  to="/custom_recipes"
                >
                  <i
                    className="fa-solid fa-share fa-lg"
                    style={{ color: "#ff7d04" }}
                  ></i>
                </Link>
              </button>
            )}
            {showIcon && !isEditing && (
              <button
                className="btn text-white rounded"
                type="submit"
                onClick={() => handleDeleteClick(recipe.id)}
              >
                <Link
                  className="text-decoration-none text-white"
                  to="/custom_recipes"
                >
                  <i
                    className="fa-solid fa-trash fa-lg"
                    style={{ color: "#FF7D04" }}
                  ></i>
                </Link>
              </button>
            )}
            {/* <button>
              <a href={`https://www.youtube.com/embed/${recipe.youtube_link}`}><i className="fa-brands fa-youtube fs-2" style={{color: "#FF7D04"}}></i>
              </a>
            </button> */}
          </p>
        </div>
      </div>

      {/* Conditionally render RecipeView */}
      {/* {selectedRecipe && <RecipeView recipe={selectedRecipe} />} */}
    </div>
  );
};

export default RecipeCard;
