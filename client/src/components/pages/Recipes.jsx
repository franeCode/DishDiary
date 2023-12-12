import RecipeCard from "../RecipeCard";
import useRecipes from "../useRecipes";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import NotFound from "./NotFound";
import Footer from "../Footer";

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
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        <div className="rounded relative z-3 w-75 d-flex flex-row justify-content-center align-items-center mt-3 p-2">
          <div className="input-group w-100 w-md-75 ">
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
        <div className="book position-relative border rounded shadow my-5 px-5">
          <div className="w-100 bg-white z-1">
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
            {/* <div className="mt-3 w-100">
              <div className="d-flex flex-row justify-content-center align-items-center p-2 m-5">
                <div className="d-none d-lg-block input-group w-100 w-md-75 ">
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
            </div> */}
          </div>
          {loading && <Spinner />}
          {!loading && (
            <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled  overflow-y-scroll list-wrapper p-md-5 p-sm-2 pb-3">
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
          <div className="position-absolute bottom-0 start-50 translate-middle-x"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;
