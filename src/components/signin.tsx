import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { signInAPI } from "../dataFetching";
import "../styles/signin.css";

interface sIgnInProp {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signin: React.FC<sIgnInProp> = ({ setIsLoggedIn }) => {
  const [signUser, setSignUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [signUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fetch = await signInAPI(signUser);

      if (fetch.data) {
        console.log("success");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      } else if (!fetch.success) {
        setError(fetch.errors[0]);
        console.log("error");
      }
    } catch {
      setError("Website is currently unavailable");
    }
  };

  return (
    <div className="signin">
      <img src={logo}></img>
      <h1>Sign in to your account</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          required
          className="email"
          type="email"
          placeholder="Email Address"
          onChange={(e) => setSignUser({ ...signUser, email: e.target.value })}
          value={signUser.email}
        />
        <input
          required
          className="password"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setSignUser({ ...signUser, password: e.target.value })
          }
          value={signUser.password}
        />
        <input type="submit" value="Sign In" className="submit" />
      </form>
      <div className="error">{error}</div>
      <div className="footer">
        <h6>New to Slack?</h6>
        <Link to="/signup">Create a new account</Link>
      </div>
    </div>
  );
};

export default Signin;
