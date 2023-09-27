// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from '../assets/img/logo-icon.svg';
// import { Link } from 'react-router-dom';
// import { handleSubmit } from './Api';
// import RecipeCard from './RecipeCard';

// const CustomRecipes = () => {
//   const [customRecipes, setCustomRecipes] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recipesPerPage = 30;
//   console.log("recipe state:", customRecipes);

//   useEffect(() => {
//     const fetchRecipes = () => {
//       axios
//         .get('/api/get_custom_recipes', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//           },
//         })
//         .then(response => {
//           setCustomRecipes(response.data);
//           console.log('CustomRecipes component - Response data:', response.data); // Log the data here
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     };
//     fetchRecipes();
//   }, []);
 
//   const deleteRecipe = async (recipeId) => {
    
//     axios
//       .delete(`/api/delete_recipe/${recipeId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         if (response.status === 200) {
//           // Update the recipes state to remove the deleted recipe
//           setCustomRecipes((prevRecipes) =>
//               prevRecipes.filter((recipe) => recipe.id !== recipeId)
//             );
//         // recipe.filter((recipe) => recipe.id !== recipeId)
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting recipe:', error);
//       });
//   };
  

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(customRecipes);
//   };
  
//   // Calculate the index of the last recipe to display on the current page
//   const indexOfLastRecipe = currentPage * recipesPerPage;
//   // Calculate the index of the first recipe to display on the current page
//   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
//   // Get the recipes to display on the current page
//   const currentRecipes = customRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

//   // Function to handle going to the next page
//   const nextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   // Function to handle going to the previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       <div className='d-flex justify-content-center align-items-center overflow-hidden'>
//         <div className='book'></div>
//         <div className='custom-options'>
//         <div className='w-100 d-flex flex-row justify-between p-2'>
//                 <button className="btn text-white rounded">
//                   <Link className='text-decoration-none text-white' to="/menu">
//                     <i style={{color: "#FF7D04"}} className="fa-solid fa-arrow-left fa-xl"></i>
//                   </Link>
//                 </button>
//                 <div className='w-100 mx-5 text-end'>
//                 <button className='btn text-white rounded' type="submit" onClick={handleSubmit}>
//                   <Link className='text-decoration-none text-white' to="/cookbook">
//                     <i style={{color: "#FF7D04"}} className="fa-regular fa-pen-to-square fa-xl"></i>
//                   </Link>
//                 </button>
//             </div>
//           </div>
          
//         </div>
//         <ul className="custom-recipes row align-items-center justify-content-center pt-5">
//         {Array.isArray(customRecipes) ? (
//             currentRecipes.map((recipe) => <RecipeCard key={recipe.id} customRecipes={customRecipes}  showIcon={true} deleteRecipe={deleteRecipe} />)
//           ) : (
//             <p>Loading...</p>
//           )}
        
//         </ul>
//         {/* <button onClick={nextPage}>
//           <i className='fa-light fa-hand-point-right'></i>
//         </button> */}
//       </div>
//    </div>
//   );
// };

// export default CustomRecipes;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/img/logo-icon.svg';
import { Link } from 'react-router-dom';
import { handleSubmit } from './Api';
import RecipeCard from './RecipeCard';

const CustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 30;
  console.log("recipe state:", recipes);
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios
      .get('/api/get_custom_recipes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(recipes);
  };
  
  // const deleteRecipe = async (recipeId) => {
    
  //       axios
  //         .delete(`/api/delete_recipe/${recipeId}`, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //           },
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           if (response.status === 200) {
  //             // Update the recipes state to remove the deleted recipe
  //             setRecipes((prevRecipes) =>
  //                 prevRecipes.filter((recipe) => recipe.id !== recipeId)
  //               );
  //           // recipe.filter((recipe) => recipe.id !== recipeId)
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error deleting recipe:', error);
  //         });
  //     };
  // Calculate the index of the last recipe to display on the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  // Calculate the index of the first recipe to display on the current page
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  // Get the recipes to display on the current page
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Function to handle going to the next page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle going to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center overflow-hidden'>
        <div className='book'></div>
        <div className='custom-options'>
        <div className='w-100 d-flex flex-row justify-between p-2'>
                <button className="btn text-white rounded">
                  <Link className='text-decoration-none text-white' to="/menu">
                    <i style={{color: "#FF7D04"}} className="fa-solid fa-arrow-left fa-xl"></i>
                  </Link>
                </button>
                <div className='w-100 mx-5 text-end'>
                <button className='btn text-white rounded' type="submit" onClick={handleSubmit}>
                  <Link className='text-decoration-none text-white' to="/cookbook">
                    <i style={{color: "#FF7D04"}} className="fa-regular fa-pen-to-square fa-xl"></i>
                  </Link>
                </button>
               
                {/* <button className='btn rounded bg-transparent'>
                  <Link className='text-decoration-none text-white' to="/custom_recipes">
                    <i style={{color: "#FF7D04"}} className="fa-regular fa-eye fa-xl"></i>
                  </Link>
                </button> */}
            </div>
          </div>
          
        </div>
        {/* <div className='book-page'>
          <div className='lines'></div>
          <div className='list'>
            <div className='holes hole-top'></div>
            <div className='holes hole-middle'></div>
            <div className='holes hole-bottom'></div>
            <ul>
            <div className="logo text-center pt-2">
              <span className='fs-3 text-black'>My DishDiary</span>
              <img src={logo} alt="logo"></img>
            </div>
              {currentRecipes.map(recipe => (
                <Link className='text-decoration-none text-black fs-4' to={''} key={recipe.id}>
                  <li className='d-flex justify-content-between' key={recipe.id}>
                    <h3 style={{lineHeight: "0.5rem"}}>
                      {recipe.id}. {recipe.title}
                    </h3>
                    <i className="fa-regular fa-trash-can"  onClick={() => deleteRecipe(recipe.id)}></i>
                  </li>
                </Link>
              ))}
            </ul>
            <div className='d-flex justify-content-around'>
              <button style={{backgroundColor: "#FF7D04"}} className='btn rounded' onClick={prevPage}>
                <i className="fa-solid fa-arrow-left text-white"></i>
              </button>
              <button style={{backgroundColor: "#FF7D04"}} className='btn rounded' onClick={nextPage}>
                <i className="fa-solid fa-arrow-right text-white"></i>
              </button>
            </div>
          </div>
        </div> */}
        <ul className="custom-recipes row align-items-center justify-content-center pt-5">
        {Array.isArray(recipes) ? (
            currentRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} customRecipeId={recipe.id} setRecipes={setRecipes}  showIcon={true} />)
          ) : (
            <p>Loading...</p>
          )}
        
        </ul>
        {/* <button onClick={nextPage}>
          <i className='fa-light fa-hand-point-right'></i>
        </button> */}
      </div>
   </div>
  );
};

export default CustomRecipes;
