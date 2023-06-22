import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {

  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };
  // Split the ingredients string into an array
  // const ingredientsArray = recipe.ingredients ? recipe.ingredients.split(', ') : [];

  return (
    <div className="col-md-2">
      <div className="d-flex flex-column justify-content-center align-items-center cards rounded">
      <Link style={{ color: '#D16B1E' }} to={`/recipe/${recipe.id}`} state={{ recipe }}>
        <div className="img-wrapper d-flex flex-column align-items-center justify-content-center shadow">
        <img
          src={recipe.image_url}
          alt="Recipe Image"
        />
        <h5 className="card-title fs-3">{recipe.title}</h5>
        </div>   
          </Link>
      </div>
    </div>
  );




};

export default RecipeCard;
