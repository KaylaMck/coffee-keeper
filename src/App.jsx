import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { RegisterNewUser } from "./components/register/RegisterNewUser";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterNewUser />} />
    </Routes>
  );
};
