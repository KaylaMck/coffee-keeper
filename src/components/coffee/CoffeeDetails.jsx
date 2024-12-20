import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteCoffee,
  getCoffeeById,
  updateCoffee,
} from "../services/coffeeServices";
import "./CoffeeDetails.css";

export const CoffeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [coffeeData, setCoffeeData] = useState({
    name: "",
    description: "",
    coffeeTypeId: 0,
    roastId: 0,
    isFavorite: false,
  });

  useEffect(() => {
    getCoffeeById(id).then((data) => {
      setCoffee(data);
      setCoffeeData({
        name: data.name,
        description: data.description,
        coffeeTypeId: data.coffeeTypeId,
        roastId: data.roastId,
        isFavorite: data.isFavorite,
      });
    });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCoffeeData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("coffee_user"));

    const updatedCoffee = {
      ...coffeeData,
      userId: currentUser?.id,
    };

    updateCoffee(id, updatedCoffee).then(() => {
      setCoffee(updatedCoffee);
      setIsEditing(false);
      navigate("/coffee-list");
    });
  };

  const handleDelete = () => {
    deleteCoffee(id).then(() => {
      navigate("/coffee-list");
    });
  };

  if (!coffee) return <p>Loading...</p>;

  return (
    <div
      className="container d-flex justify-content-center align-items-center position-relative mb-4"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4 w-75">
        <div className="d-flex justify-content-center">
          <h2 className="text-center coffee-title mb-4">
            {isEditing ? `Edit ${coffee.name}` : coffee.name}
          </h2>
          {!isEditing && (
            <span
              className={`heart-icon ${coffee.isFavorite ? "favorite" : ""}`}
            >
              {coffee.isFavorite ? "♥" : "♡"}
            </span>
          )}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={coffeeData.name}
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
                value={coffeeData.coffeeTypeId}
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
                value={coffeeData.roastId}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value={1}>Light</option>
                <option value={2}>Medium</option>
                <option value={3}>Dark</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={coffeeData.description}
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
                checked={coffeeData.isFavorite}
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
            <div className="mb-3">
              <p>
                <strong>Type:</strong> {coffee.coffeeType?.typeName}
              </p>
              <p>
                <strong>Roast:</strong> {coffee.roast?.roastType}
              </p>
              <p>
                <strong>Description:</strong> {coffee.description}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn custom-btn" onClick={handleEdit}>
                Edit Coffee
              </button>
              <button className="btn custom-btn" onClick={handleDelete}>
                Delete Coffee
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
