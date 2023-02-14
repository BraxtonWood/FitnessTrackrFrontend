import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Home from "./Home";
import User from "./User";
import Routines from "./Routines";
import Activities from "./Activities";

const Header = () => {
    return(<>
    <h1>HEADER</h1>
        {/* <div className="nav">
        <Routes>
            <Route path="/" element={ <Home/> } />

            <Route path="/routines/*" element={ <Routines/> } />

            <Route path="/activities/*" element={ <Activities/> } />

            <Route path="/user/*" element={ <User/> } />  
        </Routes>
        
        </div> */}
        </>
    );
}
export default Header;