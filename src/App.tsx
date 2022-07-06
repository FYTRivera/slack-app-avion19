import React, { useState } from "react";
import Signup from "./components/signup";
import Signin from "./components/signin";
import "./styles/app.css";
import userAccounts from "./users";

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false) //boolean to check if logged in or not
const [user, setUser] = useState({name:"", email:"", password:""}) //current user
const [error, setError] = useState("") //for error message
const [appUsers, setAppUsers] = useState([ //array to store user accounts
  {
  name: "Admin",
  email: "admin@admin.com",
  password: "admin123"
},
{
  name: "Jack",
  email: "jack@mail.com",
  password: "password"
}
])

  return (
    <div className="App">
      {(!isLoggedIn 
      ? //if not logged in 
      <Signin setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} error={error} setError={setError} appUsers={appUsers} setAppUsers={setAppUsers} />
      // <Signup />
      : //if logged in
      <>
      <span>logged in</span>
      <div>
        <span>hi {user.name}</span>
      </div>
      {/* temporary log out button vvv */}
      <button onClick={()=>setIsLoggedIn(false)}>Log Out</button>
      </>
      )}
    </div>
  );
}

export default App;
