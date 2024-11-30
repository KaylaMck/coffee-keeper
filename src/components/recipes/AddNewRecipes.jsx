import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../services/recipeServices";

export const AddNewRecipe = () => {
  const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
  const [recipeName, setRecipeName] = useState("");
  const [coffeeType, setCoffeeType] = useState("");
  const [roastType, setRoastType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      userId: currentUser.id,
      recipeName: recipeName,
      coffeeTypeId: parseInt(coffeeType),
      roastId: parseInt(roastType),
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions: instructions,
      description: description,
      isFavorite: isFavorite,
    };

    addRecipe(newRecipe).then((createdRecipe) => {
      if (createdRecipe) {
        navigate("/recipe-list");
      }
      setRecipeName("");
      setCoffeeType("");
      setRoastType("");
      setIngredients("");
      setInstructions("");
      setDescription("");
      setIsFavorite(false);
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4 mt-5 mb-5"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Add New Recipe</h3>
          <div className="form-group mb-3">
            <input
              className="form-control text-center"
              type="text"
              value={recipeName}
              placeholder="Recipe Name"
              required
              autoFocus
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <select
              className="form-select text-center"
              value={roastType}
              onChange={(e) => setRoastType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Roast
              </option>
              <option value="1">Light</option>
              <option value="2">Medium</option>
              <option value="3">Dark</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <select
              className="form-select text-center"
              value={coffeeType}
              onChange={(e) => setCoffeeType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="1">Grounds</option>
              <option value="2">Whole Beans</option>
              <option value="3">K-Cup</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Ingredients:</label>
            <textarea
              className="form-control text-center"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows="3"
              placeholder="e.g., 1 shot espresso, 1/2 cup steamed milk"
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label>Instructions:</label>
            <textarea
              className="form-control text-center"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label>Description:</label>
            <textarea
              className="form-control text-center"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <div className="form-check d-flex justify-content-center">
              <input
                type="checkbox"
                className="form-check-input"
                id="favoriteCheckbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
              />
              <label
                className="form-check-label ms-2"
                htmlFor="favoriteCheckbox"
              >
                Favorite?
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-info w-100">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
