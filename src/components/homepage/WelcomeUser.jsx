import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeUser.css";

export const WelcomeUser = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const navigate = useNavigate();

  const handleAddCoffeeClick = () => {
    navigate("/add-new-coffee");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
    console.log(currentUser.name);
    const firstName = currentUser.name.split(" ")[0];
    setUserFirstName(firstName);
  }, []);

  return (
    <main className="welcome-container">
      <section>
        <h1>Welcome, {userFirstName}!</h1>
        <div className="btn-container">
          <button className="add-coffee-btn" onClick={handleAddCoffeeClick}>
            Add New Coffee
            <p>+</p>
          </button>
        </div>
      </section>
    </main>
  );
};
