import React from "react";
import logo from "../assets/logo.svg";

export default function Signin(){
    return(
        <div className="signin">
            <img src={logo}></img>
        <h1>Sign in to your account</h1>
      <form action="">
        <input className="fullname" type="text" placeholder="Full Name" />
        <input className="email" type="email" placeholder="Email Address" />
        <input className="password" type="password" placeholder="Password" />
        <input
          className="confirm-password"
          type="password"
          placeholder="Confirm password"
        />
        <input className="submit" type="submit" value="Create Account" />
      </form>
      <div className="footer">
        <h6>Already using Slack?</h6>
        <a href="#">Sign in to an existing account</a>
      </div>
        </div>
    )
}