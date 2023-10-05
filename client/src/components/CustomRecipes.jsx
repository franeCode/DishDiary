// export default CustomRecipes;

import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/img/logo-icon.svg";
import { Link } from "react-router-dom";
import { handleSubmit } from "./Api";
import RecipeCard from "./RecipeCard";

const CustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  console.log("recipe state:", recipes);
  useEffect(() => {
    fetchRecipes();
  }, []);

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
      <div className="d-flex justify-content-center align-items-center overflow-hidden mt-5 pt-5">
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
              <button className="btn text-white rounded">
                <Link className="text-decoration-none text-white" to="/menu">
                <i
                className="fa-solid fa-arrow-left-long fa-xl"
                style={{ color: "#414448" }}
              ></i>
                </Link>
              </button>
              <div className="fs-3">COOKBOOK</div>
              <button
                className="btn text-white rounded"
                type="submit"
                onClick={handleSubmit}
              >
                <Link
                  className="text-decoration-none text-white"
                  to="/cookbook"
                >
                  <i
                    style={{ color: "#414448" }}
                    className="fa-regular fa-pen-to-square fa-xl"
                  ></i>
                </Link>
              </button>
            </div>
          </div>
          <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-5 pb-3 p-sm-2">
            {Array.isArray(recipes) ? (
              currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
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
