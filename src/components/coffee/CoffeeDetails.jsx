import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteCoffee,
  getCoffeeById,
  updateCoffee,
} from "../services/coffeeServices"; // Assuming you've created updateCoffee service
import "./CoffeeDetails.css";

export const CoffeeDetails = () => {
  const { id } = useParams(); // Get coffeeId from URL
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode
  const [coffeeData, setCoffeeData] = useState({
    name: "",
    description: "",
    coffeeTypeId: 0,
    roastId: 0,
  });

  // Fetch coffee data by ID
  useEffect(() => {
    getCoffeeById(id).then((data) => {
      setCoffee(data);
      setCoffeeData({
        name: data.name,
        description: data.description,
        coffeeTypeId: data.coffeeTypeId,
        roastId: data.roastId,
      });
    });
  }, [id]);

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoffeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for updating coffee
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("coffee_user"));

    const updatedCoffee = {
      ...coffeeData,
      userId: currentUser?.id,
    };

    updateCoffee(id, updatedCoffee).then(() => {
      setCoffee(updatedCoffee); // Update local state with the new coffee data
      setIsEditing(false); // Exit edit mode
      navigate("/coffee-list");
    });
  };

  const handleDelete = () => {
    deleteCoffee(id).then(() => {
      navigate("/coffee-list"); // Redirect to the CoffeeList after deletion
    });
  };

  if (!coffee) return <p>Loading...</p>;

  return (
    <div>
      <h2>{isEditing ? `Edit ${coffee.name}` : coffee.name}</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={coffeeData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={coffeeData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Coffee Type</label>
            <select
              name="coffeeTypeId"
              value={coffeeData.coffeeTypeId}
              onChange={handleInputChange}
            >
              <option value={1}>Grounds</option>
              <option value={2}>Beans</option>
              <option value={3}>K-Cup</option>
            </select>
          </div>
          <div>
            <label>Roast</label>
            <select
              name="roastId"
              value={coffeeData.roastId}
              onChange={handleInputChange}
            >
              <option value={1}>Light</option>
              <option value={2}>Medium</option>
              <option value={3}>Dark</option>
            </select>
          </div>
          <div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>
            <strong>Type:</strong> {coffee.coffeeType?.typeName}
          </p>
          <p>
            <strong>Roast:</strong> {coffee.roast?.roastType}
          </p>
          <p>
            <strong>Description:</strong> {coffee.description}
          </p>
          <button onClick={handleEdit}>Edit Coffee</button>
          <button onClick={handleDelete}>Delete Coffee</button>
        </>
      )}
    </div>
  );
};
