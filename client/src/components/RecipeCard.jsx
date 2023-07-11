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
    <div className="col-sm-6 col-md-4 col-lg-3 mt-5">
        {/* // <div className="d-flex flex-row justify-content-center align-items-center rounded mt-5">  */}
      {/* <Link style={{ textDecoration: "none" }} to={`/recipe/${recipe.id}`} state={{ recipe }}> */}
        {/* <div className="img-wrapper d-flex flex-column align-items-center justify-content-center shadow">
        <img
          src={recipe.image_url}
          alt="Recipe Image"
        />
        <h5 className="card-title fs-3">{recipe.title}</h5>
        </div>    */}
        {/* <div class="col"> */}
        <div className="card align-items-center rounded-4 shadow-sm mb-5" style={{ width: "18rem", height: "30rem", borderColor: "transparent" }}>
                    {/* <div class="row g-0"> */}
                        {/* <div class="col-md-4"> */}
                            <img src={recipe.image_url} class="card-img-top rounded-top-4" alt="image" ></img>
                        {/* </div> */}
                        {/* <div class="col-md-8"> */}
                            <div class="card-body">
                                <h5 class="card-title fs-2">{recipe.title}</h5>
                                <p className="fs-6 overflow-hidden" style={{ height: "4.5rem"}}>INGREDIENTS: <span style={{ fontSize: "0.6rem"}}>{recipe.ingredients}</span></p>
                                <p class="card-text">
                                <button class="stretched-link" type='button' onClick={() => handleReadMore()}>Details
                                </button>
                                <span className=''><i class="fa-brands fa-youtube fs-2" style={{color: "#e07a1a"}}></i>
                                </span>
                                </p>
                            </div>
                        {/* </div> */}
                    </div>
                {/* </div> */}
          {/* </Link> */}
      </div>
    // </div>
  );




};

export default RecipeCard;
