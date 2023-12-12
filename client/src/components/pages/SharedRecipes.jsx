import useRecipes from "../useRecipes";
import RecipeCard from "../RecipeCard";
import Spinner from "../Spinner";
import NotFound from "./NotFound";
import Footer from "../Footer";

const SharedRecipes = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
  const { recipes, loading, error } = useRecipes(
    "api/get_shared_recipes",
    headers
  );

  if (error) return <NotFound />;

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        <div className="d-lg-none bg-white rounded relative z-3 w-75 d-flex flex-row justify-content-center align-items-center mt-3 p-2">
          <p className="fs-lg-3 text-center fs-5 px-lg-5">
            ~ Community crafted recipes, from kitchen to kitchen ~
          </p>
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
            <div className="mx-lg-5 mt-3">
              <div className="d-none w-100 d-lg-flex flex-row justify-content-center align-items-center p-2">
                <p className="fs-lg-3 text-center fs-5 px-lg-5">
                  ~ Community crafted recipes, from kitchen to kitchen ~
                </p>
              </div>
            </div>
          </div>
          {loading && <Spinner />}
          {!loading && (
            <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-lg-5 p-sm-2  overflow-y-scroll list-wrapper pb-3">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    showIcon={false}
                    user={recipe.user_id}
                  />
                ))
              ) : (
                <div className="w-100 p-5 fs-4 text-center">
                  <p>No recipes to display. Start writing!</p>
                  <p className="border-card mx-auto w-50"></p>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SharedRecipes;
