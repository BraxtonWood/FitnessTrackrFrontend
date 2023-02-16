import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Login({username, setUsername, password, setPassword, token, setToken, setCurrentUsername}) {

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('https://fitness-tracker-backend.onrender.com/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: username,
          password: password,
        }
      )
    })          
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result.message === "you're logged in!") {
        setToken(window.localStorage.setItem("token", result.token));
        console.log(token)
        setUsername("");
        setPassword("");
        setCurrentUsername(window.localStorage.setItem("username", result.user.username));
        navigate("/profile");
      } else {
        alert("User not found. Please create an account.");
        setUsername("");
        setPassword("");
        navigate("/signUp");
      } 
    })
    .catch(err=>console.error(err));
  }


  
  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Log In </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>User Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <input className="submitButton" type="submit" ></input>
        </form>
        <Link className="signUpLink" to="/signup">Don't have an account? Sign Up here!</Link>
    </div>
  );
}

export default Login;