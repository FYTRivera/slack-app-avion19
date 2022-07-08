import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/index";
import Signin from "./components/signin";
import Signup from "./components/signup";
import PrivateRoutes from "./privateRoutes";
import "./styles/app.css";
import userAccounts from "./users";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //boolean to check if logged in or not
  const [user, setUser] = useState({ name: "", email: "", password: "" }); //current user
  const [error, setError] = useState(""); //for error message
  const [appUsers, setAppUsers] = useState(userAccounts);
  const navigate = useNavigate();

  if (!localStorage.getItem("appUsers")) {
    localStorage.setItem("appUsers", JSON.stringify(appUsers));
  } else if (!localStorage.getItem("isLoggedIn")) {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }

  const login = JSON.parse(localStorage.getItem("isLoggedIn") || "");

  useEffect(() => {
    if (login) {
      return navigate("dashboard");
    }
  }, [login]);

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        path="signin"
        element={
          <Signin
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            appUsers={appUsers}
            setAppUsers={setAppUsers}
          />
        }
      />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
