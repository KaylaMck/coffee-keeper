import { useState } from "react";
import { getUserByUsername } from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return getUserByUsername(username).then((user) => {
      if (user) {
        localStorage.setItem(
          "coffee_user",
          JSON.stringify({
            id: user.id,
          })
        );
        navigate("/");
      } else {
        window.alert("Invalid Username");
      }
    });
  };

  return (
    <main className="form-container">
      <section>
        <form className="form" onSubmit={handleLogin}>
          <h1>Coffee Keeper</h1>
          <h3>Please Sign In</h3>
          <div className="form-group">
            <input
              className="form-control"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
              autoFocus
            />
            <div className="button-container">
              <button className="btn-info" type="submit">
                LOGIN
              </button>
            </div>
            <div className="register-prompt">
              <p>
                Not a member?{" "}
                <Link to="/register" className="register-link">
                  Sign up here!
                </Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};
