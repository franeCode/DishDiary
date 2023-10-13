import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // const fetchRecipes = async () => {
  //   axios
  //     .get(
  //       "http://localhost:5000/api/get_recipes",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     ).then((response) => {
  //       const data = response.data;

  //     if (Array.isArray(data)) {
  //       setRecipes(data);
  //       setFilteredRecipes(data);
  //       console.log("Response data:", data);
  //     } else {
  //       console.error("Invalid data format:", data);
  //     }
  //     }).catch (error => {
  //       console.error('Logout failed:', error.message);
  //       if (error.response && error.response.status === 401) {
  //         navigate("/login");
  //       }
  //     });
  // };

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
        setFilteredRecipes(data);
        console.log("Response data:", data);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log("Search query:", query);

    // Ensure recipes is not undefined before filtering
    if (Array.isArray(recipes)) {
      const filtered = recipes.filter((recipe) => {
        if (recipe.title) {
          return recipe.title.toLowerCase().includes(query);
        }
        return false;
      });
      setFilteredRecipes(filtered);
      console.log("Filtered:", filtered);
    }
  };

  useEffect(() => {
    if (Array.isArray(recipes)) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title && recipe.title.toLowerCase().includes(searchQuery)
      );
      setFilteredRecipes(filtered);
    }
  }, [recipes, searchQuery]);

  useEffect(() => {
    handleSearchChange({ target: { value: searchQuery.toLowerCase() } });
  }, [recipes, searchQuery]);

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
        <div className="book position-relative border rounded shadow mt-5">
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
          <div className="mx-5 mt-3">
            <div className="w-100 d-flex flex-row justify-content-between align-items-center p-2">
              <div className="input-group w-50 mx-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search recipes"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e)}
                />
                <button
                  className="btn btn-outline-secondary text-light"
                  type="button"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-5 my-5 p-sm-2">
            {(searchQuery === "" ? currentRecipes : filteredRecipes).map(
              (recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  setRecipes={setRecipes}
                  showIcon={false}
                  type="recipe"
                />
              )
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

export default Recipes;
