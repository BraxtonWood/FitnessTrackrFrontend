import React from 'react';
import {Link} from 'react-router-dom';

const Activities = () => {
    return(
        <div className="nav">
        <h1>Activities</h1>
        
        <Link to="/user" className='nav-item'>User</Link>
        <Link to="/" className='nav-item'>Home</Link>
        <Link to="/routines" className='nav-item'>Routines</Link>

        </div>
    );
}
export default Activities;