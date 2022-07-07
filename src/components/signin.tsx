import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/signin.css";

const Signin: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="signin">
      <img src={logo}></img>
      <h1>Sign in to Slack</h1>
      <form action="">
        <input className="email" type="email" placeholder="Email Address" />
        <input className="password" type="password" placeholder="Password" />
        <input className="submit" type="submit" value="Sign In" />
      </form>
      <div className="footer">
        <h6>New to Slack?</h6>
        <Link to="/signup">Sign up for a new account</Link>
      </div>
    </div>
  );
};

export default Signin;
