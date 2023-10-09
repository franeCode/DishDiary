import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleSubmit } from "./Api";
import { useMemo } from "react";
import { useCallback } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_recipes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = response.data;
    
        if (Array.isArray(data)) {
          setRecipes(data);
          console.log("Response data:", data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };    
    
    fetchRecipes();
  }, []);

  // Calculate the index of the last recipe to display on the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  // Calculate the index of the first recipe to display on the current page
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  // Get the recipes to display on the current page
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // const currentRecipes = useMemo(() => {
  //   // Calculate currentRecipes here
  //   const indexOfLastRecipe = currentPage * recipesPerPage;
  //   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  //   return recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  // }, [currentPage, recipes, recipesPerPage]);
  

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
  // const nextPage = useCallback(() => {
  //   setCurrentPage(currentPage + 1);
  // }, [currentPage]);
  
  // const prevPage = useCallback(() => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }, [currentPage]);
  

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        <div className="book position-relative border rounded shadow mt-5">
          <div className="lines" style={{ minHeight: "100%" }}></div>
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
                    style={{ color: "#FF7D04" }}
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
                  recipe={recipe}
                  setRecipes={setRecipes}
                  showIcon={false}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
          {/* <div className="position-relative"> */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <button className="bg-transparent p-3" onClick={() => prevPage()}>
              <i
                class="fa-solid fa-arrow-left-long fa-xl"
                style={{ color: "#414448" }}
              ></i>
            </button>
            <button className="bg-transparent p-3" onClick={() => nextPage()}>
              <i
                class="fa-solid fa-arrow-right-long fa-xl"
                style={{ color: "#414448" }}
              ></i>
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
