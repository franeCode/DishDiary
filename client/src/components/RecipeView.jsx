import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import noImage from "../assets/img/no-image.jpeg";
import { Link } from "react-router-dom";
import { handleSubmit } from "./Api";

const RecipeView = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("RecipeView - URL Parameter ID:", id);
  console.log("Recipe data:", recipe);
  console.log("Image:", recipe.image_url);

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center overflow-hidden my-5 pt-5">
        <div className="bg-image"></div>
        <div className="book h-auto position-relative border rounded shadow mt-5">
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
              <button
                className="btn text-white rounded"
                onClick={() => navigate(-1)}
              >
                <i
                  className="fa-solid fa-arrow-left-long fa-xl"
                  style={{ color: "#414448" }}
                ></i>
              </button>
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
          <div 
            className="d-flex flex-column justify-content-center align-items-center px-5 py-4"
            // style={{ overflowY: "scroll", maxHeight: "100%"}}
            >
              {recipe && recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  className="rounded"
                  alt="image"
                  style={{ width: "25%", height: "auto" }}
                />
              ) : (
                <img
                  src={noImage}
                  className="rounded"
                  alt="image"
                  style={{ width: "25%", height: "auto" }}
                />
              )}
              <h1 
                className="text-center my-3"
                style={{ color: "#414448" }}>~ {recipe.title} ~</h1>
              <p className="border-card"></p>
              <h4 
                className="my-3 text-center fst-italic"
                style={{ color: "#414448" }}>Ingredients</h4>
                <ul className="d-flex flex-column text-center p-2 mb-0 list-unstyled">
                  <li
                    className="lh-base fs-6"
                    style={{ lineHeight: "1rem" }}
                  >
                    {recipe.ingredients}
                  </li>
                </ul>
              <div className="my-3 text-center">* * *</div>
              <p className="border-card"></p>
              <h4 
                className="my-3 text-center fst-italic"
                style={{ color: "#414448" }}>Instructions</h4>
              <p className="instructions py-2 px-5 fs-6" style={{ color: "#282727" }}>
                {recipe.instructions}
              </p>
              <div className="my-3 text-center">* * *</div>
            </div>
        </div>
      </div>
    </>
  );
};

export default RecipeView;
