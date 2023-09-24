import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Recipes from './components/Recipes';
import RecipeView from './components/RecipeView';
import RecipeCard from './components/RecipeCard';
import CookBook from './components/CookBook';
import CustomRecipes from './components/CustomRecipes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={<AppRoutes />}
        />
      </Routes>
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage ? null : <Navbar />}
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/recipe/:id" element={<RecipeView />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/cookbook" element={<CookBook />} />
        <Route path="/custom_recipes" element={<CustomRecipes />} />
        {/* <Route path="/recipe_view" element={<RecipeView />} /> */}
      </Routes>
    </>
  );
};

export default App;
