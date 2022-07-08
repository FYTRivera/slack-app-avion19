import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/signup.css";

const Signup: React.FC = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const usersList = JSON.parse(localStorage.getItem("appUsers") || "");

  useEffect(() => {
    if (isValid) {
      usersList.push(newUser);
      console.log(usersList);
    }
  }, [isValid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    usersList.map((user: { email: string }) => {
      if (user.email !== newUser.email) {
        setIsValid(true);
      } else {
        // console.log(newUser);
      }
    });
  };

  return (
    <div className="signup">
      <img src={logo}></img>
      <h1>Create your new account</h1>
      <h4>We suggest using the email address you use at work.</h4>
      <div className="buttons">
        <button className="google-signup">
          <i className="fa-brands fa-google"></i>
          Continue with Google
        </button>
        <button className="facebook-signup">
          <i className="fa-brands fa-facebook"></i>
          Continue with Facebook
        </button>
      </div>
      <h5>OR</h5>
      <form action="" onSubmit={handleSubmit}>
        <input
          required
          className="fullname"
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          required
          className="email"
          type="email"
          placeholder="Email Address"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          required
          className="password"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          required
          className="confirm-password"
          type="password"
          placeholder="Confirm password"
          value={newUser.confirm_password}
          onChange={(e) =>
            setNewUser({ ...newUser, confirm_password: e.target.value })
          }
        />
        <input className="submit" type="submit" value="Create Account" />
      </form>
      <div className="footer">
        <h6>Already using Slack?</h6>
        <Link to="/signin">Sign in to an existing account</Link>
      </div>
    </div>
  );
};

export default Signup;
