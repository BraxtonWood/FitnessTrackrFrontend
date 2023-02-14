import React from 'react';
import {Link} from 'react-router-dom';

const Routines = () => {
    return(
        <div className="nav">
        <h1>Routines</h1>
        
        <Link to="/user" className='nav-item'>User</Link>
        <Link to="/activities" className='nav-item'>Activities</Link>
        <Link to="/" className='nav-item'>Home</Link>

        </div>
    );
}
export default Routines;