import React, { useEffect, useState, FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/index";
import Signin from "./components/authentication/signin";
import Signup from "./components/authentication/signup";
import PrivateRoutes from "./utils/privateRoutes";

export const Auth = React.createContext(null);

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [client, setClient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [uid, setUid] = useState("");
  const headerData = { token, client, expiry, uid };

  const [signInData, setSignInData] = useState({});

  const navigate = useNavigate();
  console.log(signInData);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      return navigate("dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Auth.Provider value={{ headerData, signInData }}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
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
              signInData={signInData}
              setSignInData={setSignInData}
            />
          }
        />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Auth.Provider>
  );
};

export default App;
