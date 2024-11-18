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
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Coffee Keeper</h2>
        <h3>Sign Up</h3>

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            id="name"
            value={user.name}
            placeholder="Full Name"
            required
            autoFocus
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            id="email"
            value={user.email}
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            id="username"
            value={user.username}
            placeholder="Username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn-info">
            Create Account
          </button>
        </div>
        <div className="link-container">
          <p>
            Whoops..{" "}
            <Link to="/" className="login-link">
              take me back!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
