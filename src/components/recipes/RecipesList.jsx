import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipesByUserId } from "../services/recipeServices";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
  const navigate = useNavigate();

  // Filter categories and their options
  const coffeeTypes = [
    { id: 1, typeName: "Ground" },
    { id: 2, typeName: "Whole Bean" },
    { id: 3, typeName: "K-Cup" },
  ];

  const roasts = [
    { id: 1, roastType: "Light" },
    { id: 2, roastType: "Medium" },
    { id: 3, roastType: "Dark" },
  ];

  const getRecipes = () => {
    getRecipesByUserId(currentUser.id).then(setRecipes);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  useEffect(() => {
    if (!filterCategory || filterCategory === "favorite") {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          filterCategory === "favorite" ? recipe.isFavorite === true : true
        )
      );
    } else if (filterCategory && filterValue) {
      setFilteredRecipes(
        recipes.filter((recipe) => {
          if (filterCategory === "type") {
            return coffeeTypes.find(
              (type) =>
                type.id === recipe.coffeeTypesId &&
                type.typeName === filterValue
            );
          } else if (filterCategory === "roast") {
            return roasts.find(
              (roast) =>
                roast.id === recipe.roastId && roast.roastType === filterValue
            );
          }
          return true;
        })
      );
    } else {
      setFilteredRecipes(recipes);
    }
  }, [filterCategory, filterValue, recipes]);

  return (
    <main className="container" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-center align-items-center">
        <section className="container">
          <h1 className="text-center mb-4 custom-text pt-5">My Recipes</h1>
          <div className="mb-4">
            <label className="form-label me-2">Filter by:</label>
            <select
              className="form-select d-inline-block w-auto me-3"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterValue("");
              }}
            >
              <option value="">--Select--</option>
              <option value="type">Type</option>
              <option value="roast">Roast</option>
              <option value="favorite">Favorites</option>
            </select>

            {(filterCategory === "type" || filterCategory === "roast") && (
              <>
                <label className="form-label me-2">
                  Choose {filterCategory}:
                </label>
                <select
                  className="form-select d-inline-block w-auto"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <option value="">--Select--</option>
                  {[...(filterCategory === "type" ? coffeeTypes : roasts)].map(
                    (option) => (
                      <option
                        key={option.id}
                        value={
                          option[
                            filterCategory === "type" ? "typeName" : "roastType"
                          ]
                        }
                      >
                        {
                          option[
                            filterCategory === "type" ? "typeName" : "roastType"
                          ]
                        }
                      </option>
                    )
                  )}
                </select>
              </>
            )}
          </div>
          {filteredRecipes.length > 0 ? (
            <div className="row g-3 justify-content-around">
              {filteredRecipes.map((recipe) => (
                <div className="col-12 col-lg-6" key={recipe.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-4 d-flex justify-content-between align-items-center">
                        {recipe.recipeName}
                        <span
                          className={`heart-icon ${
                            recipe.isFavorite ? "favorite" : ""
                          }`}
                        >
                          {recipe.isFavorite ? "♥" : "♡"}
                        </span>
                      </h5>
                      <p className="card-text">{recipe.description}</p>
                      <button
                        className="btn btn-info mt-auto"
                        onClick={() => handleRecipeClick(recipe.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center custom-text">No Recipes Added Yet.</p>
          )}
        </section>
      </div>
    </main>
  );
};
