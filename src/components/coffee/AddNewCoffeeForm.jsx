import { useState } from "react";
import { addNewCoffee } from "../services/coffeeServices";
import { useNavigate } from "react-router-dom";

export const AddNewCoffeeForm = () => {
  const [coffeeName, setCoffeeName] = useState("");
  const [roastType, setRoastType] = useState("");
  const [coffeeType, setCoffeeType] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCoffee = {
      name: coffeeName,
      coffeeTypeId: parseInt(coffeeType),
      roastId: parseInt(roastType),
      description: description,
      userId: currentUser.id,
      isFavorite: isFavorite,
    };

    addNewCoffee(newCoffee).then((createdCoffee) => {
      if (createdCoffee) {
        navigate("/coffee-list");
      }
      setCoffeeName("");
      setRoastType("");
      setCoffeeType("");
      setDescription("");
      setIsFavorite(false);
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Add New Coffee</h3>

          <div className="form-group mb-3">
            <input
              className="form-control text-center"
              type="text"
              value={coffeeName}
              placeholder="Coffee Name"
              required
              autoFocus
              onChange={(e) => setCoffeeName(e.target.value)}
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
            <label>Description:</label>
            <textarea
              className="form-control text-center"
              value={description}
              rows="4"
              required
              onChange={(e) => setDescription(e.target.value)}
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
              Add Coffee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
