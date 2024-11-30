import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "../services/recipeServices";
import "./RecipeDetails.css";

export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [recipeData, setRecipeData] = useState({
    recipeName: "",
    coffeeTypeId: 0,
    roastId: 0,
    ingredients: "",
    instructions: "",
    description: "",
    isFavorite: false,
  });

  useEffect(() => {
    getRecipeById(id).then((data) => {
      setRecipe(data);
      setRecipeData({
        recipeName: data.recipeName,
        coffeeTypeId: data.coffeeTypeId,
        roastId: data.roastId,
        ingredients: data.ingredients,
        instructions: data.instructions,
        description: data.description,
        isFavorite: data.isFavorite,
      });
    });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("coffee_user"));

    const updatedRecipe = {
      ...recipeData,
      userId: currentUser?.id,
    };

    updateRecipe(id, updatedRecipe).then(() => {
      setRecipe(updatedRecipe);
      setIsEditing(false);
      navigate("/recipe-list");
    });
  };

  const handleDelete = () => {
    deleteRecipe(id).then(() => {
      navigate("/recipe-list");
    });
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div
      className="container d-flex justify-content-center align-items-center position-relative mb-4"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4 w-75 mt-5 mb-5">
        <div className="d-flex justify-content-center">
          <h2 className="text-center recipe-title mb-4">
            {isEditing ? `Edit ${recipe.recipeName}` : recipe.recipeName}
          </h2>
          {!isEditing && (
            <span
              className={`heart-icon ${recipe.isFavorite ? "favorite" : ""}`}
            >
              {recipe.isFavorite ? "♥" : "♡"}
            </span>
          )}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="recipeName" className="form-label">
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={recipeData.recipeName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="coffeeTypeId" className="form-label">
                Coffee Type
              </label>
              <select
                id="coffeeTypeId"
                name="coffeeTypeId"
                value={recipeData.coffeeTypeId}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value={1}>Grounds</option>
                <option value={2}>Whole Beans</option>
                <option value={3}>K-Cup</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="roastId" className="form-label">
                Roast
              </label>
              <select
                id="roastId"
                name="roastId"
                value={recipeData.roastId}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value={1}>Light</option>
                <option value={2}>Medium</option>
                <option value={3}>Dark</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
              />
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                id="isFavorite"
                name="isFavorite"
                checked={recipeData.isFavorite}
                onChange={handleInputChange}
                className="form-check-input"
              />
              <label htmlFor="isFavorite" className="form-check-label">
                Favorite?
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn custom-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="btn custom-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>
              <strong>Type:</strong> {recipe.coffeeType?.typeName}
            </p>
            <p>
              <strong>Roast:</strong> {recipe.roast?.roastType}
            </p>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p>
              <strong>Description:</strong> {recipe.description}
            </p>
            <div className="d-flex justify-content-between">
              <button className="btn custom-btn" onClick={handleEdit}>
                Edit Recipe
              </button>
              <button className="btn custom-btn" onClick={handleDelete}>
                Delete Recipe
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
