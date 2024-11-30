export const getCoffeeByUserId = (id) => {
  return fetch(`http://localhost:8088/coffees?userId=${id}`).then((res) =>
    res.json()
  );
};

export const addNewCoffee = (newCoffee) => {
  return fetch("http://localhost:8088/coffees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCoffee),
  }).then((res) => res.json());
};

export const getCoffeeById = (id) => {
  return fetch(
    `http://localhost:8088/coffees/${id}?_expand=coffeeType&_expand=roast`
  ).then((res) => res.json());
};

export const deleteCoffee = (id) => {
  return fetch(`http://localhost:8088/coffees/${id}`, {
    method: "DELETE",
  });
};

export const updateCoffee = (id, coffeeData) => {
  return fetch(`http://localhost:8088/coffees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coffeeData),
  }).then((res) => res.json());
};

export const getAllCoffees = () => {
  return fetch(`http://localhost:8088/coffees`).then((res) => res.json);
};

// export const addCoffeeToFavorites = (userId, coffeeId) => {
//   return fetch("http://localhost:8088/coffeeFavorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId,
//       coffeeId,
//     }),
//   }).then((res) => res.json());
// };

// export const removeCoffeeFromFavorites = () => {
//   return fetch(`http://localhost:8088/coffeeFavorites/${userId}/${coffeeId}`, {
//     method: "DELETE",
//   }).then((res) => res.json());
// };

// export const getFavoriteCoffees = (userId) => {
//   return fetch(`http://localhost:8088/coffeeFavorites/${userId}`).then((res) =>
//     res.json()
//   );
// };
