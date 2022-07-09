import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/index";
import Signin from "./components/signin";
import Signup from "./components/signup";
import PrivateRoutes from "./privateRoutes";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      return navigate("dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
