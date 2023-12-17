import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRecipes = (apiEndpoint, headers = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          ...headers,
        },
      });
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("An error occurred while fetching recipes.");

      if (error.response) {
        if (error.response.status === 401) {
          navigate("/login");
        } else {
          navigate("/not_found");
        }
      } else {
        navigate("/not_found");
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return { recipes, loading, error, fetchRecipes };
};

export default useRecipes;
