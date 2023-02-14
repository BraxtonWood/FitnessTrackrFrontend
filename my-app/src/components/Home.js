import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return(
        <div className="nav">
        <h1>Home Page</h1>
        
        <Link to="/user" className='nav-item'>User</Link>
        <Link to="/activities" className='nav-item'>Activities</Link>
        <Link to="/routines" className='nav-item'>Routines</Link>
        </div>
    );
}
export default Home;