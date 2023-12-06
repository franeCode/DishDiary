import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noImage from "../assets/img/no-image.jpeg";
import axios from "axios";

const RecipeCard = ({
  recipe,
  setRecipes,
  customRecipe,
  customRecipeId,
  showRecipeMessage,
  type,
  user
}) => {
  const [isIconVisible, setIsIconVisible] = useState(false); // State for showing/hiding icons
  const displayRecipe = recipe || customRecipe;
  const navigate = useNavigate();
  // const username = localStorage.getItem("username");
  // console.log("User:", customRecipe.user_id)
  
  const handleReadMore = () => {
    if (displayRecipe && displayRecipe.id) {
      navigate(`/recipe/${displayRecipe.id}`, {
        state: { 
          recipe: displayRecipe,
          image_url: displayRecipe.image_url, 
        },
      });
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
            recipes.filter((recipe) => recipe.id !== recipeId)
          );
          showRecipeMessage("Recipe deleted successfully.", "delete");
        }
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const shareRecipe = (customRecipeId, recipeId, formData, user) => {
    axios
      .post(`/api/share_recipe/${customRecipeId}/${recipeId}`, {
        formData,
        user
      } , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      })
      .then((response) => {
        showRecipeMessage("Recipe shared successfully.", "share");
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <li>
      <div
        className="d-flex flex-sm-row container flex-grow-1 align-items-start justify-content-center rounded-4 shadow position-relative mb-4"
        style={{ width: "100%", borderColor: "transparent" }}
      >
        {displayRecipe && displayRecipe.image_url ? (
          <img
            src={displayRecipe.image_url}
            className="card-img-top rounded-4 m-sm-3"
            alt="image"
            style={{ width: "30%", height: "80%" }}
          />
        ) : (
          <img
            src={noImage}
            className="card-img-top rounded-4 m-sm-3"
            alt="image"
            style={{ width: "30%", height: "80%" }}
          />
        )}
        {/* <p>Written by {username}</p> */}
        <div className="card-body my-3 p-2">
          <div className="d-flex flex-row justify-content-between">
            <h5 className="card-title fs-4 mx-3 mx-sm-0">
              {displayRecipe ? displayRecipe.title : "No title available"}
            </h5>
            <button
              className="rounded bg-transparent p-sm-2"
              onClick={() => setIsIconVisible(!isIconVisible)} 
            >
              <i className="fa-solid fa-ellipsis-vertical fa-xl" style={{ color: "#414448" }}></i>
            </button>
          </div>
            <div className="icon-box">
              <div className="d-flex flex-column justify-content-between">
            {type === "custom" && isIconVisible && (
              <div className="d-flex flex-column justify-content-between">
                <button
                  className="btn rounded bg-transparent"
                  onClick={() => shareRecipe(customRecipeId, displayRecipe.id)}
                >
                  <Link 
                    className="show-icon text-decoration-none" to="/custom_recipes"
                    style={{ color: "#414448" }}>
                    <p className="mb-0 px-2">Share</p>
                    <i className="fa-solid fa-share-nodes fa-sm" style={{ color: "#414448" }}></i>
                  </Link>
                </button>
                <button
                  className="btn text-white rounded"
                  type="submit"
                  onClick={() => deleteRecipe(displayRecipe.id)}
                >
                  <Link 
                    className="show-icon text-decoration-none" to="/custom_recipes"
                    style={{ color: "#414448" }}>
                      <p className="mb-0 px-2">Delete</p>
                    <i className="fa-solid fa-trash fa-sm" style={{ color: "#414448" }}></i>
                  </Link>
                </button>
              </div>
            )}
            {isIconVisible && (
              <button
                className="btn bg-transparent rounded"
                type="button"
                style={{ color: "#414448" }}
                onClick={() => handleReadMore()}
              >
                <span className="show-icon">
                  <p className="mb-0 px-2">Read more</p>
                  <i className="fa-solid fa-info fa-sm" style={{ color: "var(--text-color)" }}></i>
                </span>
              </button>
            )}
          </div>
          </div>
          <p className="d-none d-sm-block border-card"></p>
          <p className="d-none d-sm-block fs-6 mb-0">
            Ingredients:{" "}
            <span style={{ fontSize: "0.8rem" }}>{displayRecipe.ingredients.substring(0, 25)}</span>
          </p>
          <p className="d-none d-sm-block border-card"></p>
          <p className="d-none d-sm-block fs-6 overflow-y-hidden mb-0" style={{ height: "5rem", width: "90%" }}>
            Instructions:{" "}
            <span style={{ fontSize: "0.8rem" }}>
              {displayRecipe ? displayRecipe.instructions : ""}
            </span>
            <span>...</span>
          </p>
         {displayRecipe 
          ?
          <p className="d-none d-sm-block ">Written by: {user}</p>
          :
          <p className="d-none d-sm-block ">Written by: themealdb.com</p>
        }
          
        </div>
      </div>
    </li>
  );
};

export default React.memo(RecipeCard);

