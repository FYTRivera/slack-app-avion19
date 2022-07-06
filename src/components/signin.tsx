import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Signin: React.FC = () => {
  return (
    <div className="signin">
      <img src={logo}></img>
      <h1>Sign in to your account</h1>
      <form action="">
        <input className="email" type="email" placeholder="Email Address" />
        <input className="password" type="password" placeholder="Password" />
        <input className="submit" type="submit" value="Create Account" />
      </form>
      <div className="footer">
        <h6>New to Slack?</h6>
        <Link to="/signup">Sign up to an existing account</Link>
      </div>
    </div>
  );
};

export default Signin;
