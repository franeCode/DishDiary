import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import noImage from '../assets/img/no-image.jpeg';
import { deleteRecipe } from './Api';
import axios from 'axios';

const RecipeCard = ({ recipe, showIcon, customRecipeId }) => {

  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

// Function to share a custom recipe with a regular recipe
const shareRecipe = (customRecipeId, recipeId) => {
    // Create a FormData object to send data as multipart/form-data
    const formData = new FormData();

    // Add customRecipeId and recipeId to the FormData
    formData.append('customRecipeId', customRecipeId);
    formData.append('recipeId', recipeId);

    // Send the POST request to share the recipe
    axios
      .post(`/api/share_recipe/${customRecipeId}/${recipeId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
    .then((response) => {
      // Handle success
      console.log(response.data.message);
      // You can also update your UI to reflect the successful sharing action
    })
    .catch((error) => {
      // Handle error
      console.error(error.response.data.error);
    });
};

// shareCustomRecipeWithRegular(customRecipeId, recipeId);


  // Check if recipe.image_url is an absolute URL (contains http or https)
  // const isAbsoluteURL = /^https?:\/\//i.test(recipe.image_url);

  // const imageSrc = isAbsoluteURL ? recipe.image_url : `${recipe.image_url}`;
  // console.log(recipe.image_url)
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mt-5">
      <div className="card align-items-center rounded-4 shadow-sm mb-5 position-relative" style={{ width: "18rem", height: "25rem", borderColor: "transparent" }}>
        {
          recipe.image_url ? (
            <img
              src={recipe.image_url}
              className="card-img-top rounded-top-4"
              alt="image"
            />
          ) : (
            <img
              src={noImage}
              className="card-img-top rounded-top-4"
              alt="image"
            />
          )
        }
        <div className="card-body pt-0">
          <h5 className="card-title fs-4">{recipe.title}</h5>
          <p className="fs-6 overflow-hidden mb-0" style={{ height: "1.5rem"}}>INGREDIENTS: <span style={{ fontSize: "0.8rem"}}>{recipe.measure}{recipe.ingredients}</span></p>
          <p className="d-flex justify-content-start align-items-center gap-4 card-text">
            <button className="btn bg-transparent rounded" type='button' onClick={() => handleReadMore()}><i className="fa-solid fa-info fa-lg" style={{color: "#FF7D04"}}></i>
            </button>
            {showIcon && (
            <button className='btn rounded bg-transparent position-absolute top-0 end-0 p-2' onClick={() => shareRecipe(customRecipeId, recipe.id)}>
              <Link className='text-decoration-none text-white' to="/custom_recipes">
              <i className="fa-solid fa-share fa-lg" style={{color: "#ff7d04"}}></i>
              </Link>
            </button>
            )}
            {showIcon &&  (
            <button className='btn text-white rounded' type="submit" onClick={() => deleteRecipe()}>
              <Link className='text-decoration-none text-white' to="/custom_recipes">
                <i className="fa-solid fa-trash fa-lg" style={{color: "#FF7D04"}}></i>
              </Link>
            </button>
            )}
            {/* <button>
              <a href={`https://www.youtube.com/embed/${recipe.youtube_link}`}><i className="fa-brands fa-youtube fs-2" style={{color: "#FF7D04"}}></i>
              </a>
            </button> */}
          </p>
        </div>
      </div>
    </div>
  );




};

export default RecipeCard;
