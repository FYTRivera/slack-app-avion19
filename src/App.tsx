import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/index";
import Signin from "./components/signin";
import Signup from "./components/signup";
import PrivateRoutes from "./privateRoutes";
import "./styles/app.css";

const App: React.FC = () => {
  localStorage.setItem("isLoggedIn", JSON.stringify(true));
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
