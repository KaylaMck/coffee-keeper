import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";
import { RegisterNewUser } from "./components/register/RegisterNewUser";
import { WelcomeUser } from "./components/homepage/WelcomeUser";
import { NavBar } from "./components/nav/NavBar";
import { CoffeeList } from "./components/coffee/CoffeeList";
import { AddNewCoffeeForm } from "./components/coffee/AddNewCoffeeForm";
import { CoffeeDetails } from "./components/coffee/CoffeeDetails";
import { RecipeList } from "./components/recipes/RecipesList";
import { RecipeDetails } from "./components/recipes/RecipeDetails";
import { AddNewRecipe } from "./components/recipes/AddNewRecipes";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterNewUser />} />
      <Route
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="/homepage" element={<WelcomeUser />} />
        <Route path="/coffee-list" element={<CoffeeList />} />
        <Route path="/coffee/:id" element={<CoffeeDetails />} />
        <Route path="/add-new-coffee" element={<AddNewCoffeeForm />} />
        <Route path="/recipe-list" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<AddNewRecipe />} />
      </Route>
    </Routes>
  );
};
