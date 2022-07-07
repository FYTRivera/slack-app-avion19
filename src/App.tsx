import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/index";
import Signin from "./components/signin";
import Signup from "./components/signup";
import PrivateRoutes from "./privateRoutes";
import "./styles/app.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //boolean to check if logged in or not
  const [user, setUser] = useState({ name: "", email: "", password: "" }); //current user
  const [error, setError] = useState(""); //for error message
  const [appUsers, setAppUsers] = useState([
    //array to store user accounts
    {
      name: "Admin",
      email: "admin@admin.com",
      password: "admin123",
    },
    {
      name: "Jack",
      email: "jack@mail.com",
      password: "password",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        path="signin"
        element={
          <Signin
            setIsLoggedIn={setIsLoggedIn}
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
