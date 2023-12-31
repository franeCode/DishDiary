import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Intro from "./components/pages/Intro";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Recipes from "./components/pages/Recipes";
import RecipeView from "./components/pages/RecipeView";
import RecipeCard from "./components/RecipeCard";
import CookBook from "./components/pages/CookBook";
import CustomRecipes from "./components/pages/CustomRecipes";
import SharedRecipes from "./components/pages/SharedRecipes";
import NotFound from "./components/pages/NotFound";
// import axios from "axios";

// axios.defaults.baseURL = "https://dish-diary-9993d7a31702.herokuapp.com/";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppRoutes />} />
        {/* <Route path="/not_found" element={<NotFound />}></Route> */}
      </Routes>
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      {isHomePage ? null : <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeView />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/shared" element={<SharedRecipes />} />
        <Route path="/create_recipe" element={<CookBook />} />
        <Route path="/custom_recipes" element={<CustomRecipes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
