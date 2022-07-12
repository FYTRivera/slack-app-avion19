import React, { useEffect, useRef, useState, FC } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { signInAPI } from "../dataFetching";
import "../styles/signin.css";

interface signInProp {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setClient: React.Dispatch<React.SetStateAction<string>>;
  setExpiry: React.Dispatch<React.SetStateAction<string>>;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}

const Signin: FC<signInProp> = (props) => {
  const { setIsLoggedIn, setToken, setClient, setExpiry, setUid } = props;
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
      const response = await fetch.json();

      if (response.data) {
        setIsLoggedIn(true);
        setToken(fetch.headers.get("access-token"));
        setClient(fetch.headers.get("client"));
        setExpiry(fetch.headers.get("expiry"));
        setUid(fetch.headers.get("uid"));
      } else if (!response.success) {
        errorRef.current.classList.add("animation");
        setError(response.errors[0]);
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
