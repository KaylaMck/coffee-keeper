import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeUser.css";

export const WelcomeUser = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const navigate = useNavigate();

  const handleAddCoffeeClick = () => {
    navigate("/add-new-coffee");
  };

  const handleAddRecipeClick = () => {
    navigate("/add-recipe");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
    console.log(currentUser.name);
    const firstName = currentUser.name.split(" ")[0];
    setUserFirstName(firstName);
  }, []);

  return (
    <main className="container" style={{ minHeight: "100vh" }}>
      <h1 className="text-center pt-5 display-4 fw-bold mb-4 custom-heading">
        Welcome, {userFirstName}!
      </h1>
      <section className="row justify-content-center">
        {/* Add New Coffee Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <button
                onClick={handleAddCoffeeClick}
                className="btn btn-primary custom-btn d-flex align-items-center justify-content-center w-100 p-5"
              >
                Add New Coffee
              </button>
            </div>
          </div>
        </div>

        {/* Add New Coffee Recipe Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <button
                onClick={handleAddRecipeClick}
                className="btn btn-success custom-btn d-flex align-items-center justify-content-center w-100 p-5"
              >
                Add New Coffee Recipe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
