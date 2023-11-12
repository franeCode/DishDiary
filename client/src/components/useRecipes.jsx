// useRecipes.js
import { useState, useEffect } from "react";
import axios from "axios";

const useRecipes = (apiEndpoint, headers = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchRecipes();
  }, [apiEndpoint, headers]);

  return { recipes, loading };
};

export default useRecipes;
