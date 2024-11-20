export const getUserByUsername = (username) => {
  return fetch(`http://localhost:8088/users?username=${username}`).then((res) =>
    res.json()
  );
};

export const addNewUser = (newUser) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};
