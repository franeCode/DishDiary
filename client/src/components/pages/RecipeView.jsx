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

  // const imageUrl = `${window.location.origin}/${recipe.image_url}`;

  // Check if the image URL is an external URL
  const isExternalImage = recipe.image_url.startsWith('http');

  // Construct the imageUrl based on whether it's external or custom
  const imageUrl = isExternalImage ? recipe.image_url : `${window.location.origin}/${recipe.image_url}`;


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
              <Link className="text-decoration-none" to="/create_recipe">
                <i
                  style={{ color: "#414448" }}
                  className="fa-regular fa-pen-to-square fa-xl"
                ></i>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center px-5 py-4">
            {image_url ? (
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
              ~ {recipe.title} ~
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
