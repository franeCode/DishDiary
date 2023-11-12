import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import useRecipes from "./useRecipes";
import Spinner from "./Spinner";

const CustomRecipes = () => {
  const [shareMessage, setShareMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
  const { recipes, loading } = useRecipes(
    "http://localhost:5000/api/get_custom_recipes",
    headers
  );

  // Function to show the message
  const showRecipeMessage = (message, messageType) => {
    if (messageType === "share") {
      setShareMessage(message);
      setTimeout(() => {
        setShareMessage("");
      }, 3000);
    } else if (messageType === "delete") {
      setDeleteMessage(message);
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        {shareMessage && (
          <div
            className="bg-light position-absolute middle-50 rounded px-4 text-success p-2"
            style={{ top: "9%", zIndex: "2" }}
          >
            {shareMessage}
          </div>
        )}

        {deleteMessage && (
          <div
            className="bg-light position-absolute middle-50 rounded px-4 text-success"
            style={{ top: "9%", zIndex: "2" }}
          >
            {deleteMessage}
          </div>
        )}
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
          <div className="mx-5 mt-3">
            <div className="w-100 d-flex p-2">
              <div className="flex-grow-1 text-center ps-sm-5 fs-3">
                ~ COOKBOOK ~
              </div>
              <button className="d-none d-sm-block btn text-white rounded align-self-end">
                <Link
                  className="text-decoration-none text-white"
                  to="/create_recipe"
                >
                  <i
                    style={{ color: "#555" }}
                    className="fa-regular fa-pen-to-square fa-xl"
                  ></i>
                </Link>
              </button>
            </div>
          </div>
          {loading && <Spinner />}
          {!loading && (
            <ul className="row row-cols-lg-2 row-cols-md-1 list-unstyled p-lg-5 my-5 p-sm-2">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    customRecipe={recipe}
                    customRecipeId={recipe.id}
                    showIcon={true}
                    showRecipeMessage={showRecipeMessage}
                    type="custom"
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
    </div>
  );
};

export default CustomRecipes;
