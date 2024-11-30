import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../services/userServices";
import "./RegisterNewUser.css";

export const RegisterNewUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewUser(user).then((createdUser) => {
      if (createdUser && createdUser.id) {
        localStorage.setItem(
          "coffee_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
            username: createdUser.username,
            email: createdUser.email,
          })
        );

        navigate("/");

        setUser({
          name: "",
          email: "",
          username: "",
        });
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Coffee Keeper</h1>
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="form-group mb-3">
            <input
              className="form-control text-center"
              type="text"
              id="name"
              value={user.name}
              placeholder="Full Name"
              required
              autoFocus
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control text-center"
              type="email"
              id="email"
              value={user.email}
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control text-center"
              type="text"
              id="username"
              value={user.username}
              placeholder="Username"
              required
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-info w-100">
              Create Account
            </button>
          </div>
          <div className="text-center">
            <p>
              Whoops..{" "}
              <Link to="/" className="login-link">
                take me back!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
