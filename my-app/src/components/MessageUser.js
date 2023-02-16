/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";


function MessageUser ({currentUsername, userMessage}) {
  const [messageUsername, setMessageUsername] = useState("")
  
  useEffect(() => {
  if (currentUsername !== "Please Log In") {
    setMessageUsername(currentUsername)
  }})

  console.log(messageUsername)
  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Hello {messageUsername}</h1>
        <p className="pageMessage">{userMessage}</p>
        {/* <Link className="signUpLink" to="/signup">Don't have an account? Sign Up here!</Link> */}
    </div>
  );
}

export default MessageUser;