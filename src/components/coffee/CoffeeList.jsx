import { useEffect, useState } from "react";
import { getAllCoffees, getCoffeeByUserId } from "../services/coffeeServices";
import { useNavigate } from "react-router-dom";
import "./CoffeeList.css";
import { AddNewCoffeeForm } from "./AddNewCoffeeForm";

export const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
  const navigate = useNavigate();

  const getCoffees = () => {
    getCoffeeByUserId(currentUser.id).then(setCoffees);
  };

  useEffect(() => {
    getCoffees();
  }, []);

  const handleCoffeeClick = (id) => {
    navigate(`/coffee/${id}`);
  };

  return (
    <div>
      <h2>My Coffees</h2>
      {coffees.length > 0 ? (
        <div>
          {coffees.map((coffee) => (
            <div key={coffee.id}>
              <button onClick={() => handleCoffeeClick(coffee.id)}>
                <p>{coffee.name}</p>
                <p>{coffee.description}</p>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No Coffees Added Yet.</p>
      )}
    </div>
  );
};
