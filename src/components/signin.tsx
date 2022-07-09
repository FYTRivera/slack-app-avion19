import React, { useEffect, useRef, useState } from "react";
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
  const errorRef = useRef(null);

  //Hides error message when user types in the form
  useEffect(() => {
    setError("");
    errorRef.current.classList.remove("animation");
  }, [signUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    error && errorRef.current.classList.remove("animation");

    try {
      const fetch = await signInAPI(signUser);

      if (fetch.data) {
        setIsLoggedIn(true);
      } else if (!fetch.success) {
        errorRef.current.classList.add("animation");
        setError(fetch.errors[0]);
      }
    } catch {
      errorRef.current.classList.add("animation");
      setError("Sign in is currently under maintenance");
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
      <div className="error" ref={errorRef}>
        {error}
      </div>
      <div className="footer">
        <h6>New to Slack?</h6>
        <Link to="/signup">Create a new account</Link>
      </div>
    </div>
  );
};

export default Signin;
