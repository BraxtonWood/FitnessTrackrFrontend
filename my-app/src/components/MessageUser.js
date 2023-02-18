/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";


function MessageUser ({currentUsername, userMessage, successStatus}) {

  let navigate = useNavigate();

  if (successStatus){
    setTimeout(() => navigate("/myroutines"), 3000);
  } else {
    setTimeout(() => navigate(-1), 3000);
  }
  
  
  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Hello {currentUsername}</h1>
        <p className="pageMessage">{userMessage}</p>
    </div>
  );
}

export default MessageUser;