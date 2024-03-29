import React, { useEffect, useRef, useState, FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { signUpAPI } from "../../utils/dataFetching";
import "../../styles/signup.css";
import { HashLoader } from "react-spinners";

const Signup: FC = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const nameIn = useRef(null);
  const emailIn = useRef(null);
  const passIn = useRef(null);
  const conPassIn = useRef(null);
  const errorRef = useRef(null);
  const myForm = useRef(null);
  const refs = [nameIn, emailIn, passIn, conPassIn];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError("");
    errorRef.current.classList.remove("animation");
  }, [newUser]);

  useEffect(() => {
    refs.forEach((ref) => {
      ref.current.value = "";
    });
  }, [isCreated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    error && errorRef.current.classList.remove("animation");

    try {
      const fetch = await signUpAPI(newUser);
      setIsLoading(false);

      if (fetch.status === "error") {
        errorRef.current.classList.add("animation");
        errorRef.current.style.color = "red";
        setError(fetch.errors.full_messages[0]);
      } else if (fetch.status === "success") {
        errorRef.current.style.color = "green";
        setError("Account Successfully Created");
        setIsCreated(true);
      }
    } catch (error) {
      setIsLoading(false);
      errorRef.current.classList.add("animation");
      setError("Sign up is currently under maintenance");
    }
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
      <h5 className="or">OR</h5>
      <form action="" onSubmit={handleSubmit} ref={myForm}>
        <input
          required
          ref={nameIn}
          className="fullname"
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          required
          ref={emailIn}
          className="email"
          type="email"
          placeholder="Email Address"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          required
          ref={passIn}
          className="password"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          required
          ref={conPassIn}
          className="confirm-password"
          type="password"
          placeholder="Confirm password"
          value={newUser.password_confirmation}
          onChange={(e) =>
            setNewUser({ ...newUser, password_confirmation: e.target.value })
          }
        />
        <button className="submit" onClick={handleSubmit}>
          <div>
            {isLoading ? (
              <HashLoader size={19} color="white" />
            ) : (
              "Create Account"
            )}
          </div>
        </button>
      </form>
      <div ref={errorRef} className="errorSignUp">
        {error}
      </div>
      <div className="footer">
        <h4 className="already-slack">Already using Slack?</h4>
        <Link to="/" className="link-signup">
          Sign in to an existing account
        </Link>
      </div>
    </div>
  );
};

export default Signup;
