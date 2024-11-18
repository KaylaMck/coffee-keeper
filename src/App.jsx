import { Outlet, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { RegisterNewUser } from "./components/register/RegisterNewUser";
import { WelcomeUser } from "./components/homepage/WelcomeUser";
import { NavBar } from "./components/nav/NavBar";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterNewUser />} />
      <Route
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="/homepage" element={<WelcomeUser />} />
      </Route>
    </Routes>
  );
};
