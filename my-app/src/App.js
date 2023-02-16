import './App.css';
import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
// import User from "./components/User";
import Routines from "./components/Routines";
import Header from './components/Header';
import Login from './components/Login';
import Activities from "./components/Activities";
import SignUp from "./components/SignUp";
import MyRoutines from "./components/MyRoutines";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")
  const [currentUsername, setCurrentUsername] = useState("Please Log In");
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  
  
  return (
    <div>
      <Header currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />} />
        <Route path="/routines" element={ <Routines token={token} publicRoutines={publicRoutines} setPublicRoutines={setPublicRoutines}  /> } />
        <Route path="/activities" element={ <Activities activities={activities} setActivities={setActivities}/> } />
        <Route path="/signup" element={ <SignUp username={username} setUsername={setUsername} password={password} setPassword={setPassword} setCurrentUsername={setCurrentUsername} setToken={setToken} currentUsername={currentUsername}/>} />
        <Route path="/myroutines" element={ <MyRoutines username={username} token={token}/>}/>
        {/* <Route path="/user" element={ <User /> } />   */}
      </Routes>
    </div>
  );
}

export default App;