import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noImage from "../../assets/img/no-image.jpeg";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import Footer from "../Footer";

const RecipeView = () => {
  const location = useLocation();
  const { recipe, image_url } = location.state || {};
  const navigate = useNavigate();

  if (!recipe) return <NotFound />;

  const isExternalImage = recipe.image_url.startsWith('http');

  const imageUrl = isExternalImage ? recipe.image_url : `${window.location.origin}/${recipe.image_url}`;


  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
            <div className="w-75 rounded d-flex justify-content-between bg-white align-items-center mt-3 p-2 z-3">
              <button
                className="btn text-white rounded mx-2"
                onClick={() => navigate(-1)}
              >
                <i
                  className="fa-solid fa-arrow-left-long fa-lg"
                  style={{ color: "#414448" }}
                ></i>
              </button>
              <Link className="text-decoration-none mx-2" to="/create_recipe">
                <i
                  style={{ color: "#414448" }}
                  className="fa-regular fa-pen-to-square fa-lg"
                ></i>
              </Link>
            </div>
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
          <div className="d-flex flex-column justify-content-center align-items-center px-5 py-4">
            {recipe.image_url ? ( 
              <img
                src={imageUrl}
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
            <h1 className="text-center my-3" style={{ color: "#414448" }}>
             {recipe.title}
            </h1>
            <p className="border-card"></p>
            <h4
              className="my-3 text-center fst-italic"
              style={{ color: "#414448" }}
            >
              Ingredients
            </h4>
            <ul className="d-flex flex-column text-center p-2 mb-0 list-unstyled">
              <li className="lh-base fs-6" style={{ lineHeight: "1rem" }}>
                {recipe.ingredients}
              </li>
            </ul>
            <div className="my-3 text-center">* * *</div>
            <p className="border-card"></p>
            <h4
              className="my-3 text-center fst-italic"
              style={{ color: "#414448" }}
            >
              Instructions
            </h4>
            <p
              className="instructions py-2 px-lg-5 fs-6"
              style={{ color: "#282727" }}
            >
              {recipe.instructions}
            </p>
            <div className="my-3 text-center">* * *</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeView;
