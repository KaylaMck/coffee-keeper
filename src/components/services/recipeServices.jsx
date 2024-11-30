export const getAllCoffeeTypes = () => {
  return fetch("http://localhost:8088/coffeeTypes").then((res) => res.json());
};

export const getAllRoasts = () => {
  return fetch("http://localhost:8088/roasts").then((res) => res.json());
};

export const addRecipe = (newRecipe) => {
  return fetch("http://localhost:8088/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  }).then((res) => res.json());
};

export const getRecipesByUserId = (id) => {
  return fetch(`http://localhost:8088/recipes?userId=${id}`).then((res) =>
    res.json()
  );
};

export const getRecipeById = (id) => {
  return fetch(
    `http://localhost:8088/recipes/${id}?_expand=coffeeType&_expand=roast`
  ).then((res) => res.json());
};

export const updateRecipe = (id, recipeData) => {
  return fetch(`http://localhost:8088/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  }).then((res) => res.json());
};

export const deleteRecipe = (id) => {
  return fetch(`http://localhost:8088/recipes/${id}`, {
    method: "DELETE",
  });
};

// export const addRecipeToFavorites = (userId, recipeId) => {
//   return fetch("http://localhost:8088/recipeFavorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId,
//       recipeId,
//     }),
//   }).then((res) => res.json());
// };

// export const removeRecipeFromFavorites = () => {
//   return fetch(`http://localhost:8088/recipeFavorites/${userId}/${recipeId}`, {
//     method: "DELETE",
//   }).then((res) => res.json());
// };

// export const getFavoriteRecipes = (userId) => {
//   return fetch(`http://localhost:8088/recipeFavorites/${userId}`).then((res) =>
//     res.json()
//   );
// };
