import React, { useEffect, useRef, useState, FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { signInAPI } from "../../utils/dataFetching";
import "../../styles/signin.css";
import { HashLoader } from "react-spinners";

interface signInProp {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setClient: React.Dispatch<React.SetStateAction<string>>;
  setExpiry: React.Dispatch<React.SetStateAction<string>>;
  setUid: React.Dispatch<React.SetStateAction<string>>;
  signInData: {};
  setSignInData: React.Dispatch<React.SetStateAction<{}>>;
}

const Signin: FC<signInProp> = (props) => {
  const {
    setIsLoggedIn,
    setToken,
    setClient,
    setExpiry,
    setUid,
    signInData,
    setSignInData,
  } = props;
  const [signUser, setSignUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const errorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError("");
    errorRef.current.classList.remove("animation");
  }, [signUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    error && errorRef.current.classList.remove("animation");

    try {
      const fetch = await signInAPI(signUser);
      const response = await fetch.json();

      if (response.data) {
        setIsLoggedIn(true);
        setIsLoading(false);

        setToken(fetch.headers.get("access-token"));
        setClient(fetch.headers.get("client"));
        setExpiry(fetch.headers.get("expiry"));
        setUid(fetch.headers.get("uid"));
        setSignInData(response.data);
      } else if (!response.success) {
        setIsLoading(false);
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
      <form action="">
        <input
          className="email"
          type="email"
          placeholder="Email Address"
          onChange={(e) => setSignUser({ ...signUser, email: e.target.value })}
          value={signUser.email}
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setSignUser({ ...signUser, password: e.target.value })
          }
          value={signUser.password}
        />
        <button className="submit-div" onClick={handleSubmit}>
          <div>
            {isLoading ? <HashLoader size={19} color="white" /> : "Sign In"}
          </div>
        </button>
      </form>
      <div className="errorSignIn" ref={errorRef}>
        {error}
      </div>
      <div className="footer">
        <h4 className="new-slack">New to Slack?</h4>
        <Link to="/signup" className="link-signin">
          Create a new account
        </Link>
      </div>
    </div>
  );
};

export default Signin;
