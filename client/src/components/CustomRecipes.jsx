// export default CustomRecipes;

import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/img/logo-icon.svg";
import { Link } from "react-router-dom";
import { handleSubmit } from "./Api";
import RecipeCard from "./RecipeCard";
import { useLocation } from "react-router-dom";

const CustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isRecipeAdded = queryParams.get("formValid") === "true";
  // const showMessage = queryParams.get("showMessage") === "false";
  
  useEffect(() => {
    fetchRecipes();
  }, []);

  // useEffect(() => {
  //   if (isRecipeAdded && showMessage) {
  //     // Use setTimeout to hide the message after 5 seconds
  //     const timer = setTimeout(() => {
  //       // Update the URL to remove the showMessage parameter
  //       queryParams.delete("showMessage");
  //       window.history.replaceState(null, "", `?${queryParams}`);
  //     }, 5000);

  //     // Clean up the timer on component unmount or when a new recipe is clicked
  //     return () => clearTimeout(timer);
  //   }
  // }, [isRecipeAdded, showMessage, queryParams]);

  const fetchRecipes = () => {
    axios
      .get("/api/get_custom_recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        const customRecipes = response.data.map((recipe) => {
          // Check if ingredients are provided as a single string
          if (typeof recipe.ingredients === 'string') {
            const ingredientsArray = recipe.ingredients.split(', ');
            return {
              ...recipe,
              ingredients: ingredientsArray,
            };
          }
          return recipe; // If the format is already correct, return as is
        });

        setRecipes(customRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        <div className="book position-relative border rounded shadow mt-5">
          <div className="lines"></div>
          <div
            className="holes hole-top"
            style={{ width: "20px", height: "20px" }}
          ></div>
          <div
            className="holes hole-middle"
            style={{ width: "20px", height: "20px" }}
          ></div>
          <div
            className="holes hole-bottom"
            style={{ width: "20px", height: "20px" }}
          ></div>
          <div className="mx-5 mt-3">
            <div className="w-100 d-flex flex-row justify-content-between align-items-center p-2">
            {/* <button className="btn text-dark rounded">
                <Link className="text-decoration-none text-white px-2" to="/menu">
                  <i
                    style={{ color: "#FF7D04" }}
                    className="fa-solid fa-arrow-left fa-xl"
                  ></i>
                </Link>
                Go back
              </button> */}
              <div className="fs-3">COOKBOOK</div>
              <button
                className="btn text-white rounded"
              >
                <Link
                  className="text-decoration-none text-white"
                  to="/create_recipe"
                >
                  <i
                    style={{ color: "#414448" }}
                    className="fa-regular fa-pen-to-square fa-xl"
                  ></i>
                </Link>
              </button>
            </div>
          </div>
          <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-5 my-5 p-sm-2">
            {Array.isArray(recipes) ? (
              currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  customRecipe={recipe}
                  customRecipeId={recipe.id}
                  setRecipes={setRecipes}
                  showIcon={true}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <button className="p-3 bg-transparent" onClick={() => prevPage()}>
              <i
                className="fa-solid fa-arrow-left-long fa-xl"
                style={{ color: "#414448" }}
              ></i>
            </button>
            <button className="p-3 bg-transparent" onClick={() => nextPage()}>
              <i
                className="fa-solid fa-arrow-right-long fa-xl"
                style={{ color: "#414448" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomRecipes;
