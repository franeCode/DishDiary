import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SharedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      console.log("Fetching recipes...");
      const response = await axios.get(
        "http://localhost:5000/api/get_shared_recipes",
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
      if (error.response && error.response.status === 401) {
        console.log("Redirecting to login page...");
        navigate("/login");
      }
    }
  };
  

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
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
        <div className="book position-relative border rounded shadow mt-5 px-5">
          <div className="lines my-5"></div>
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
          <div className="mx-lg-5 mt-3">
            <div className="w-100 d-flex flex-row justify-content-between align-items-center p-2">
              <div className="input-group mx-auto">
              </div>
            </div>
          </div>
          <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-md-5 my-5 p-sm-2">
            {recipes.length > 0 ? (
              currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  setRecipes={setRecipes}
                  showIcon={false}
                  user={recipe.user_id}
                />
                ))
                ) : (
                  <div className="w-100 p-5 fs-4 text-center">
                    <p>No recipes to display. Start writing!
                    </p>
                    <p className="border-card mx-auto w-50"></p>
                  </div>
                )}
          </ul>
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <button className="bg-transparent p-3" onClick={() => prevPage()}>
              <i
                className="fa-solid fa-arrow-left-long fa-xl"
                style={{ color: "#414448" }}
              ></i>
            </button>
            <button className="bg-transparent p-3" onClick={() => nextPage()}>
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

export default SharedRecipes;
