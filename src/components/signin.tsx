import { userInfo } from "os";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

type SignInProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: {
    name: string;
    email: string;
    password: string;
  }
  setUser: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    password: string;
  }>>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  appUsers: {
    name: string;
    email: string;
    password: string;
  }[]
  setAppUsers: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    password: string;
  }[]>>
}

export default function Signin(props: SignInProps){

  const user = props.user
  const setUser = props.setUser
  const error = props.error
  const setError = props.setError
  const appUsers = props.appUsers
  const setAppUsers = props.setAppUsers

    function onSignIn(){
      //finds the index of the user's account in the appUsers array
      const specificIndex = appUsers.findIndex(e => (e.email===user.email))
      console.log(specificIndex)

      //if account exists
      if(specificIndex>=0)
      {
        //if user log in is successful
        if(user.email===appUsers[specificIndex].email && user.password===appUsers[specificIndex].password){
        setUser({...user, name: appUsers[specificIndex].name})
        props.setIsLoggedIn(true);
        //removes error message
        setError("")
        }

        // //if user inputs an email that is not a user email
        // else if(user.email!="" && user.email!=appUsers[specificIndex].email){
        //   setError("E-mail is incorrect.")
        //   console.log(user)
        // }

        //if user inputs a correct user email but does not input the correct password
        else if(user.email===appUsers[specificIndex].email && user.password!=appUsers[specificIndex].password){
          setError("Password is incorrect.")
          console.log(user)
        }

        //if failed
        else{
          //logs that there is no account when nothing is inputted
          console.log("no account")
          console.log(user)
          //shows error message on page that user log in is invalid
          setError("Invalid.")
        }
      }

      //if account does not exist
      else{
        //logs that there is no account when nothing is inputted
        console.log("no account")
        console.log(user)
        //shows error message on page that user log in is invalid
        setError("Invalid.")
      }
    }

    //"e: { preventDefault: () => void; }" works but I do not know how HAHA
    function handleSubmit(e: { preventDefault: () => void; }){
      e.preventDefault()
    }

    return(
        <div className="signin">
            <img src={logo}></img>
        <h1>Sign in to your account</h1>
      <form action="" onSubmit={handleSubmit}>
        <input required className="email" type="email" placeholder="Email Address" onChange={e=>setUser({...user, email: e.target.value})} value={user.email}/>
        <input required className="password" type="password" placeholder="Password" onChange={e=>setUser({...user, password: e.target.value})} value={user.password} />
        <button onClick={onSignIn}>Sign In</button>
        {(error!="")?(<div className="error">{error}</div>): ""}
      </form>
      <div className="footer">
        <h6>New to Slack?</h6>
        <a href="#">Create a new account!</a>
      </div>
    </div>
  );
};

