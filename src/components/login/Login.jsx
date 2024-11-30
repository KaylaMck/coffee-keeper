import { useState } from "react";
import { getUserByUsername } from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Handling loading state and error messages
    getUserByUsername(username)
      .then((foundUsers) => {
        if (foundUsers && foundUsers.length > 0) {
          const user = foundUsers[0];
          localStorage.setItem(
            "coffee_user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
            })
          );
          navigate("/homepage");
        } else {
          alert("Invalid Username");
        }
      })
      .catch((error) => {
        alert("An error occurred during login. Please try again.");
        console.error(error);
      });
  };

  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <section
        className="card p-4 shadow-sm w-100"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4">Coffee Keeper</h1>
        <h3 className="text-center mb-4">Please Sign In</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-center">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control text-center"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Username"
              required
              autoFocus
            />
          </div>
          <div className="mb-3 text-center">
            <button type="submit" className="btn custom-login-btn w-100">
              LOGIN
            </button>
          </div>
          <div className="text-center">
            <p>
              Not a member?{" "}
              <Link to="/register" className="custom-link">
                Sign up here!
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};
