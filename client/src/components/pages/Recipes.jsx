import RecipeCard from "../RecipeCard";
import useRecipes from "../useRecipes";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import NotFound from "./NotFound";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
  const { recipes, loading, error } = useRecipes(
    "http://localhost:5000/api/get_recipes",
    headers
  );

  useEffect(() => {
    if (Array.isArray(recipes)) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title && recipe.title.toLowerCase().includes(searchQuery)
      );
      setFilteredRecipes(filtered);
      console.log("Filtered:", filtered);
    }
  }, [recipes, searchQuery]);

  if (error) return <NotFound />;

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        <div className="book overflow-y-scroll border rounded shadow mt-5 px-5">
          <div className="static-wrapper w-75 bg-white z-1">
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
              <div className="w-75 d-flex flex-row justify-content-center align-items-center p-2 m-5">
                <div className="input-group mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search recipes"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                  />
                  <button
                    className="rounded text-light"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {loading && <Spinner />}
          {!loading && (
            <ul
              className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-md-5 p-sm-2"
              style={{ marginTop: "13rem" }}
            >
              {(searchQuery === "" ? recipes : filteredRecipes).map(
                (recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    showIcon={false}
                    type="recipe"
                  />
                )
              )}
            </ul>
          )}
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            {/* <button className="bg-transparent p-3" onClick={() => prevPage()}>
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
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
