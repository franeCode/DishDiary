// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// // import { useParams } from 'react-router-dom';

// const RecipeView = () => {
//   const location = useLocation();  
//   const { recipe } = location.state || {}; 
//   const navigate = useNavigate();

  
//   // const recipe = id;
//   // const [isEditing, setIsEditing] = useState(false);
//   // const [editedRecipe, setEditedRecipe] = useState({
//   //   title: recipe ? recipe.title : '', // Check if recipe is defined
//   //   ingredients: recipe ? recipe.ingredients : '', // Check if recipe is defined
//   //   instructions: recipe ? recipe.instructions : '', // Check if recipe is defined
//   // });

  
//   // const handleEditClick = () => {
//   //   setIsEditing(true);
//   // };

//   // const handleSaveClick = () => {
//   //   if (!editedRecipe) {
//   //     console.log('Recipe data is not available.');
//   //     return;
//   //   }
    
//   //   const id = editedRecipe.id; // Use editedRecipe.id instead of recipe.id

//   //   const formData = new FormData();
//   //   formData.append('title', editedRecipe.title);
//   //   formData.append('ingredients', editedRecipe.ingredients);
//   //   formData.append('instructions', editedRecipe.instructions);
//   //   formData.append('image', editedRecipe.image);
  
//   //   axios.put(`/api/update_recipe/${id}`, formData, {
//   //     headers: {
//   //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//   //       'Content-Type': 'multipart/form-data',
//   //     },
//   //   })
//   //   .then((response) => {
//   //     console.log(response);
//   //     // Handle success, e.g., redirect to the recipe view page
//   //   })
//   //   .catch((error) => {
//   //     console.error('Error updating recipe:', error);
//   //   });
//   // };

//   // const handleCancelClick = () => {
//   //   // Handle cancel edit here
//   //   setIsEditing(false);
//   // };
//   // console.log(customRecipeId)
//   return (
//     <div className='page d-flex justify-content-center align-items-center relative'>
//       <div className='book'></div>
//       <div className='book-page relative'>
//         <div className="lines"></div>
//         {/* {isEditing ? (
//           <div className="list">
//             <label>Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={editedRecipe.title}
//               onChange={(e) => setEditedRecipe({ ...editedRecipe, title: e.target.value })}
//             />

//             <label>Ingredients:</label>
//             <textarea
//               name="ingredients"
//               value={editedRecipe.ingredients}
//               onChange={(e) => setEditedRecipe({ ...editedRecipe, ingredients: e.target.value })}
//             ></textarea>

//             <label>Instructions:</label>
//             <textarea
//               name="instructions"
//               value={editedRecipe.instructions}
//               onChange={(e) => setEditedRecipe({ ...editedRecipe, instructions: e.target.value })}
//             ></textarea>

//             <button onClick={handleSaveClick}>Save</button>
//             <button onClick={handleCancelClick}>Cancel</button>
//           </div>
//         ) : ( */}
//           <div className="list">
//             {/* <h1>Id: {id}</h1> */}
//             <h1>recipe.title</h1>
//             <ul>Ingredients:
//               <li className='text-decoration-none'>recipe.ingredients</li>
//             </ul>
//             <p className='instructions fs-5' style={{ color: '#282727' }}>recipe.instructions</p>
//             {/* <button className='btn text-white rounded' type="submit" onClick={handleEditClick}>
//               <i style={{color: "#FF7D04"}} className="fa-regular fa-pen-to-square fa-xl"></i>
//             </button> */}
//           </div>
//         {/* )} */}
//         <div className="holes hole-top"></div>
//         <div className="holes hole-middle"></div>
//         <div className="holes hole-bottom"></div>
//       </div>
//       <a href={`https://www.youtube.com/embed/${recipe ? recipe.youtube_link : ''}`}>Watch Video</a>
//     </div>
//   );
// };

// export default RecipeView;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import noImage from "../assets/img/no-image.jpeg";

// const RecipeView = () => {
//   const location = useLocation();
//   const { recipe } = location.state || {};
//   const { id } = useParams();
//   console.log('RecipeView - URL Parameter ID:', id);
//   console.log('Recipe data:', recipe);

//   if (!recipe) {
//     return <div>No recipe data available.</div>;
//   }

//   return (
//     <>
//     <div className='page d-flex justify-content-center align-items-center relative'>
//       <div className='book'></div>
//       <div className='book-page relative'>
//         <div className="lines"></div>
//         <div className="list">
//           <h1>{recipe.title}</h1>
//           <div className="" style={{height: "5rem", width: "5rem"}}>
//           {recipe.image_url ? (
//           <img
//             src={recipe.image_url}
//             className="card-img-top rounded-top-4"
//             alt="image"
//           />
//         ) : (
//           <img
//             src={noImage}
//             className="card-img-top rounded-top-4"
//             alt="image"
//           />
//         )}
//         </div>
//           <div className="d-flex flex-row">
//           <ul className='d-flex flex-column' style={{width: "10rem"}}>
//             <li className='text-decoration-none'>{recipe.measure}</li>
//           </ul>
//           <ul className='d-flex flex-column' style={{width: "10rem"}}>
//             <li className='text-decoration-none'>{recipe.ingredients}</li>
//           </ul>
//           {/* <ul className='d-flex flex-column'>
//                 {measures.map((measure, index) => (
//                   <li key={index} className='text-decoration-none'>{measure}</li>
//                 ))}
//               </ul>
//               <ul>
//                 {ingredients.map((ingredient, index) => (
//                   <li key={index} className='d-flex flex-column text-decoration-none'>{ingredient}</li>
//                 ))}
//               </ul> */}
//           </div>
//           <p className='instructions fs-6' style={{ color: '#282727' }}>{recipe.instructions}</p>
//         </div>
//         <div className="holes hole-top"></div>
//         <div className="holes hole-middle"></div>
//         <div className="holes hole-bottom"></div>
//       </div>
//       <a href={`https://www.youtube.com/embed/${recipe.youtube_link}`}>Watch Video</a>
//     </div>
//     </>
//   );
// };

// export default RecipeView;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import noImage from "../assets/img/no-image.jpeg";

const RecipeView = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  const { id } = useParams();
  console.log('RecipeView - URL Parameter ID:', id);
  console.log('Recipe data:', recipe);

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  // Split measures and ingredients by comma
  const measures = recipe.measure && recipe.measure.trim() !== '' ? recipe.measure.split(', ') : [];
  const ingredients = recipe.ingredients && recipe.ingredients.trim() !== '' ? recipe.ingredients.split(', ') : [];


  if (measures.length !== ingredients.length) {
    return <div>Invalid data format for measures and ingredients.</div>;
  }

  return (
    <>
      <div className='page d-flex justify-content-center align-items-center relative'>
        <div className='book'></div>
        <div className='book-page relative'>
          <div className="lines"></div>
          <div className="list">
            <div className="d-flex flex-row">
            <div className="d-flex flex-column p-3">
            <h1>{recipe.title}</h1>
            <div className="d-flex flex-row border border-dark" style={{ width: "20rem", height: "25rem"}}>
              <ul className='d-flex flex-column text-center p-0 mb-0'>
                {measures.map((measure, index) => (
                  <li key={index} className='text-decoration-none fs-6'
                  style={{lineHeight: "1rem"}}>{measure}</li>
                ))}
              </ul>
              <ul className='d-flex flex-column text-center p-0 mb-0'>
                {ingredients.map((ingredient, index) => (
                  <li key={index} className='text-decoration-none fs-6'
                  style={{lineHeight: "1rem"}}>{ingredient}</li>
                ))}
              </ul>
            </div>
            </div>
            <div className='d-flex flex-column p-3 mt-5'>
            {/* <div className="" style={{height: "15rem", width: "20rem"}}>
              {recipe.image_url ? (
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
              )}
            </div> */}
            <p className='instructions fs-5' style={{ color: '#282727' }}>{recipe.instructions}
            </p>
          </div>
          </div>
          </div>
          <div className="holes hole-top"></div>
          <div className="holes hole-middle"></div>
          <div className="holes hole-bottom"></div>
        </div>
        <a href={`https://www.youtube.com/embed/${recipe.youtube_link}`}>Watch Video</a>
      </div>
    </>
  );
};

export default RecipeView;
