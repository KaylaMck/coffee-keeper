import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("coffee_user");
    navigate("/", { replace: true });
  };

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/homepage">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/my-coffee-list">
          My Coffees
        </Link>
      </li>
      <li className="navbar-item navbar-logout">
        <Link className="navbar-link" to="" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </ul>
  );
};
