import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../Footer";

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

    if (
      recipe.title.trim() === "" ||
      recipe.ingredients.trim() === "" ||
      recipe.instructions.trim() === ""
    ) {
      setFormValid(false);
      setShowMessage(true);
    } else {
      setFormValid(true);

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
            title: "",
            ingredients: "",
            instructions: "",
            image: null,
          });
          setShowMessage(true);
        })
        .catch((error) => {
          console.log(error);
          setShowMessage(true);
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
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
    <div className="pt-5">
      <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden mt-5 pt-5">
        <div className="bg-image"></div>
        {!formValid && showMessage ? (
          <div
            className="bg-light position-absolute middle-50 rounded px-4"
            style={{ top: "10%", zIndex: "2" }}
          >
            <p className="text-center p-3" style={{ color: "red" }}>
              Form is invalid. Please fill out all required fields.
            </p>
          </div>
        ) : (
          " "
        )}
        {formValid && showMessage ? (
          <div
            className="bg-light position-absolute middle-50 rounded px-4"
            style={{ top: "10%", zIndex: "2" }}
          >
            <p className="text-center p-3" style={{ color: "green" }}>
              Recipe added successfully!
            </p>
          </div>
        ) : null}
        <div
          className="book position-relative border rounded shadow my-5 p-3"
          style={{ height: "100%" }}
        >
          
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
          <form className="d-flex flex-column justify-content-center align-items-center form">
            <h3 className="text-center p-2" style={{ color: "#555" }}>
              ~ CookBook ~
            </h3>
            <input
              className="border-none w-75"
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
            <div
              className="d-flex flex-sm-row flex-wrap flex-sm-nowrap justify-content-between justify-content-center p-2 w-75"
              style={{ color: "#555" }}
            >
              <div className="d-sm-flex flex-column justify-content-sm-evenly">
                <label className="d-none d-md-block text-start fs-6">
                  Image cannot exceed 50mb
                </label>
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
              </div>
              <div className="flex flex-row p-2">
                <button
                  className="rounded m-1 p-md-2 fs-5"
                  type="submit"
                  style={{
                    backgroundColor: "#ff7d04",
                    color: "#fff",
                    width: "4rem",
                    height: "3rem",
                  }}
                  onClick={handleSubmit}
                >
                  {" "}
                  add
                </button>
                <button
                  className="rounded m-1 p-1 p-md-2 fs-5"
                  type="submit"
                  style={{
                    backgroundColor: "#555",
                    color: "#fff",
                    width: "4rem",
                    height: "3rem",
                  }}
                >
                  <Link
                    className="text-decoration-none text-white"
                    to="/custom_recipes"
                  >
                    view
                  </Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookBook;
