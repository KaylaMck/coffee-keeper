import { useEffect, useState } from "react";
import { getCoffeeByUserId, updateCoffee } from "../services/coffeeServices";
import { useNavigate } from "react-router-dom";
import "./CoffeeList.css";

export const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredCoffees, setFilteredCoffees] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("coffee_user"));
  const navigate = useNavigate();

  const roasts = [
    { id: 1, roastType: "Light" },
    { id: 2, roastType: "Medium" },
    { id: 3, roastType: "Dark" },
  ];

  const coffeeTypes = [
    { id: 1, typeName: "Ground" },
    { id: 2, typeName: "Whole Bean" },
    { id: 3, typeName: "K-Cup" },
  ];

  const getCoffees = () => {
    getCoffeeByUserId(currentUser.id).then(setCoffees);
  };

  useEffect(() => {
    getCoffees();
  }, []);

  const handleCoffeeClick = (id) => {
    navigate(`/coffee/${id}`);
  };

  useEffect(() => {
    if (!filterCategory || filterCategory === "favorite") {
      setFilteredCoffees(
        coffees.filter((coffee) =>
          filterCategory === "favorite" ? coffee.isFavorite === true : true
        )
      );
    } else if (filterCategory && filterValue) {
      setFilteredCoffees(
        coffees.filter((coffee) => {
          if (filterCategory === "type") {
            return coffeeTypes.find(
              (type) =>
                type.id === coffee.coffeeTypeId && type.typeName === filterValue
            );
          } else if (filterCategory === "roast") {
            return roasts.find(
              (roast) =>
                roast.id === coffee.roastId && roast.roastType === filterValue
            );
          }
          return true;
        })
      );
    } else {
      setFilteredCoffees(coffees);
    }
  }, [filterCategory, filterValue, coffees]);

  return (
    <main className="container" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-center align-items-center">
        <section className="container">
          <h1 className="text-center mb-4 custom-text pt-5">My Coffees</h1>
          <div className="mb-4">
            <label className="form-label me-2">Filter by:</label>
            <select
              className="form-select d-inline-block w-auto me-3"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterValue("");
              }}
            >
              <option value="">--Select--</option>
              <option value="type">Type</option>
              <option value="roast">Roast</option>
              <option value="favorite">Favorites</option>
            </select>
            {(filterCategory === "type" || filterCategory === "roast") && (
              <>
                <label className="form-label me-2">
                  Choose {filterCategory}:
                </label>
                <select
                  className="form-select d-inline-block w-auto"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <option value="">--Select--</option>
                  {[...(filterCategory === "type" ? coffeeTypes : roasts)].map(
                    (option) => (
                      <option
                        key={option.id}
                        value={
                          option[
                            filterCategory === "type" ? "typeName" : "roastType"
                          ]
                        }
                      >
                        {
                          option[
                            filterCategory === "type" ? "typeName" : "roastType"
                          ]
                        }
                      </option>
                    )
                  )}
                </select>
              </>
            )}
          </div>
          {filteredCoffees.length > 0 ? (
            <div className="row g-3 justify-content-center">
              {filteredCoffees.map((coffee) => (
                <div className="col-12 col-lg-6" key={coffee.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-4 d-flex justify-content-between align-items-center">
                        {coffee.name}
                        <span
                          className={`heart-icon ${
                            coffee.isFavorite ? "favorite" : ""
                          }`}
                        >
                          {coffee.isFavorite ? "♥" : "♡"}
                        </span>
                      </h5>
                      <p className="card-text">{coffee.description}</p>
                      <button
                        className="btn btn-info mt-auto"
                        onClick={() => handleCoffeeClick(coffee.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center custom-text">No Coffees Added Yet.</p>
          )}
        </section>
      </div>
    </main>
  );
};
