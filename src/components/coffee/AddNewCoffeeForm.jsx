import { useState } from "react";
import { addNewCoffee } from "../services/coffeeServices";
import { useNavigate } from "react-router-dom";

export const AddNewCoffeeForm = () => {
  const [coffeeName, setCoffeeName] = useState("");
  const [roastType, setRoastType] = useState("");
  const [coffeeType, setCoffeeType] = useState("");
  const [description, setDescription] = useState("");
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
    };
    console.log(newCoffee);

    addNewCoffee(newCoffee).then((createdCoffee) => {
      if (createdCoffee) {
        navigate("/coffee-list");
      }
      setCoffeeName("");
      setRoastType("");
      setCoffeeType("");
      setDescription("");
    });
  };

  return (
    <div className="add-new-coffee-container">
      <h2>Add New Coffee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Coffee Name:</label>
          <input
            type="text"
            value={coffeeName}
            onChange={(e) => setCoffeeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Roast:</label>
          <select
            value={roastType}
            onChange={(e) => setRoastType(e.target.value)}
            required
          >
            <option value="">Select Roast</option>
            <option value="1">Light</option>
            <option value="2">Medium</option>
            <option value="3">Dark</option>
          </select>
        </div>
        <div>
          <label>Type:</label>
          <select
            value={coffeeType}
            onChange={(e) => setCoffeeType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="1">Grounds</option>
            <option value="2">Whole Beans</option>
            <option value="3">K-Cup</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit">Add Coffee</button>
      </form>
    </div>
  );
};
