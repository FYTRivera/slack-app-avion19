import React, { ChangeEvent } from "react";
import logo from "../assets/logo.svg";
import "../styles/signup.css";

interface SignupProps {
  // e: Event,
  name: String;
}

export default function Signup() {
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
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
      <form action="">
        <input className="fullname" type="text" placeholder="Full Name" />
        <input className="email" type="email" placeholder="Email Address" />
        <input className="password" type="password" placeholder="Password" />
        <input
          className="confirm-password"
          type="password"
          placeholder="Confirm password"
        />
        <input
          className="submit"
          type="submit"
          value="Create Account"
          onClick={handleSubmit}
        />
      </form>
      <div className="footer">
        <h6>Already using Slack?</h6>
        <a href="#">Sign in to an existing account</a>
      </div>
    </div>
  );
}
