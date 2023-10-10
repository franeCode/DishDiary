import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CookBook = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
  });
  const [formValid, setFormValid] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    console.log("Recipe:", recipe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("image", recipe.image);
    axios
      .post("/api/add_recipe", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      })
      .then((resp) => {
        const data = resp.data;
        setRecipe({
          title: data.title,
          ingredients: data.ingredients,
          instructions: data.instructions,
          image: data.image,
          imagePreview: data.imagePreview,
        });
        if (
          recipe.title === "" ||
          recipe.ingredients === "" ||
          recipe.instructions === ""
        ) {
          setFormValid(false);
          setShowMessage(true);
        } else {
          setFormValid(true);
          setShowMessage(false);
          navigate("/custom_recipes?formValid=true&showMessage=false");
        }
        // Reset the recipe state
        setRecipe({
          title: "",
          ingredients: "",
          instructions: "",
          image: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update the state with the image file and the preview URL
        setRecipe({
          ...recipe,
          image: imageFile,
          imagePreview: e.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        {!formValid && showMessage ? (
          <div className="bg-light rounded px-4" style={{ zIndex: "2" }}>
            <p className="text-center p-3" style={{ color: "red" }}>
              Form is invalid. Please fill out all required fields.
            </p>
          </div>
        ) : (
          " "
        )}
        <div className="book position-relative border rounded shadow mt-5">
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
          <form className="list my-5">
            <input
              className="border-none fs-3 w-75"
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <input
              className="flex word-wrap w-75"
              type="text"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleInputChange}
              placeholder="Ingredients"
            />
            <textarea
              className="border-none w-75"
              type="text"
              name="instructions"
              value={recipe.instructions}
              onChange={handleInputChange}
              placeholder="Instructions"
            />
            <label className="px-5">Do you want to upload image?</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                fontSize: "1rem",
                color: "#555",
                padding: "0rem",
                border: "none",
              }}
            />
            <button
              className="btn rounded position-absolute end-0 bottom-0 translate-middle fs-3"
              type="submit"
              style={{ color: "#FF7D04" }}
              onClick={handleSubmit}
            >
              Add
              {/* <Link
                className="text-decoration-none text-white"
                to="/custom_recipes"
              > */}
              {/* <i
                  style={{ color: "#FF7D04" }}
                  className="fa-solid fa-check fa-2xl"
                ></i> */}
              {/* </Link> */}
            </button>
          </form>
          <div className="holes hole-top"></div>
          <div className="holes hole-middle"></div>
          <div className="holes hole-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default CookBook;
