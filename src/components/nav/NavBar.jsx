import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("coffee_user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
      <div className="container-fluid">
        {/* Logo or Title */}
        <Link className="navbar-brand" to="/homepage">
          Coffee Keeper
        </Link>
        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto w-75 justify-content-between">
            <li className="nav-item">
              <Link className="nav-link" to="/homepage">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coffee-list">
                My Coffees
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipe-list">
                My Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
