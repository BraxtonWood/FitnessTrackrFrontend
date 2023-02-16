import React from "react";
import { Link, useNavigate } from 'react-router-dom';


function Header({token, setToken, currentUsername, setCurrentUsername}) {

   
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setToken("");
        setCurrentUsername("Please Log In");
        navigate("/");
    }

  return (
    <div className="header">
        <div className="headerTop">
            <div className="headerAboutContainer">
                <h1 className="aboutTitle">Fitness Trac.kr</h1>
                <h5 className="aboutSlogan"> Get your Routine on!! </h5>
            </div>        
        </div>
        <div className="headerLinksContainer">
            <nav className="headerNavBarContainer">
                <Link className="navBarLink" to="/">Home |</Link>
                <Link className="navBarLink" to="/routines">Routines |</Link>
                <Link className="navBarLink" to="/profile">Profile</Link>
            </nav>
            <nav className="headerUserControlsContainer">
                <p className="userControlsWelcome">Welcome {currentUsername}!</p>
                {currentUsername === ("Please Log In") && <Link className="userControlsLoginLink" to="/login">Log In</Link>}
                {currentUsername !== ("Please Log In") && <button className="userControlsLoginLink" onClick={handleSubmit} >Log Out</button>}
            </nav>            
        </div>
    </div>
  );
}
export default Header;