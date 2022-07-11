import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/index";
import Signin from "./components/signin";
import Signup from "./components/signup";
import PrivateRoutes from "./privateRoutes";

export const Auth = React.createContext(null);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [client, setClient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [uid, setUid] = useState("");
  const userData = { token, client, expiry, uid };

  const navigate = useNavigate();

  // console.log("token :", token);
  // console.log("client :", client);
  // console.log("expiry :", expiry);
  // console.log("uid :", uid);
  // console.log(userData);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      return navigate("dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Auth.Provider value={userData}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/dashboard/*"
            element={
              <Dashboard
              // token={token}
              // client={client}
              // expiry={expiry}
              // uid={uid}
              />
            }
          />
        </Route>

        <Route
          path="signin"
          element={
            <Signin
              setIsLoggedIn={setIsLoggedIn}
              setToken={setToken}
              setClient={setClient}
              setExpiry={setExpiry}
              setUid={setUid}
            />
          }
        />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Auth.Provider>
  );
};

export default App;
