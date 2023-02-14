import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import User from "./components/User";
import Routines from "./components/Routines";
import Activities from "./components/Activities";

function App() {
  const [publicRoutines, setPublicRoutines] = useState([])
   
  return (<>
  <div className='header'>
    
    <Header className="App"/>
    <Routines/> 
    </div>
    {/* <div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/routines" element={ <Routines /> } />
        <Route path="/activities" element={ <Activities /> } />
         <Route path="/user" element={ <User /> } />  
    </Routes>
    </div> */}
    </>
  );
}

export default App;
