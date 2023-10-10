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
          <div className="d-flex flex-start px-5 py-4">
            <div className="w-25" style={{ flex: "0 0 auto" }}>
              {recipe && recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  className="rounded-top-4"
                  alt="image"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ) : (
                <img
                  src={noImage}
                  className="rounded-top-4"
                  alt="image"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
              )}
            </div>
            <div
              className="d-flex flex-column px-5 mt-2"
              style={{ flex: "1 1 auto" }}
            >
              <h1 className="fs-3">{recipe.title}</h1>
              <p className="border-card"></p>
              <div className="d-flex flex-row">
                Ingredients:
                <ul>
                  <li
                    className="text-decoration-none fs-6"
                    style={{ lineHeight: "1rem" }}
                  ></li>
                </ul>
                <ul className="d-flex flex-column text-center p-0 mb-0">
                  <li
                    className="text-decoration-none fs-6"
                    style={{ lineHeight: "1rem" }}
                  >
                    {recipe.ingredients}
                  </li>
                </ul>
              </div>

              <p className="border-card"></p>
              <p className="instructions fs-6" style={{ color: "#282727" }}>
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
        <div className="holes hole-top"></div>
        <div className="holes hole-middle"></div>
        <div className="holes hole-bottom"></div>
      </div>
    </>
  );
};

export default RecipeView;
