import './App.css';
import React, { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Routines from "./components/Routines";
import Header from './components/Header';
import Login from './components/Login';
import Activities from "./components/Activities";
import SignUp from "./components/SignUp";
import MyRoutines from "./components/MyRoutines";
import NewRoutine from './components/NewRoutine';
import MessageUser from './components/MessageUser';
import NewActivity from './components/NewActivity';
import AddActivity from './components/AddActivity';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const [currentUsername, setCurrentUsername] = useState(window.localStorage.getItem("username"));
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [userMessage, setUserMessage] = useState("")
  const [activities, setActivities] = useState([]);
  
  return (
    <div>
      <Header currentUsername={currentUsername} setCurrentUsername={setCurrentUsername}/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/newroutine" element={ <NewRoutine token={token} setUserMessage={setUserMessage} /> } />
        <Route path="/login" element={ <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />} />
        <Route path="/routines" element={ <Routines token={token} publicRoutines={publicRoutines} setPublicRoutines={setPublicRoutines}  /> } />
        <Route path="/activities" element={ <Activities activities={activities} setActivities={setActivities}/> } />
        <Route path="/signup" element={ <SignUp username={username} setUsername={setUsername} password={password} setPassword={setPassword} setCurrentUsername={setCurrentUsername} setToken={setToken}/>} />
        <Route path="/myroutines" element={ <MyRoutines username={username} token={token}/>}/>
        <Route path="/mymessages" element={<MessageUser currentUsername={currentUsername} userMessage={userMessage}/>}/>
        <Route path="/newactivity" element={ <NewActivity setUserMessage={setUserMessage}/> } />
        <Route path="/addactivity" element={ <AddActivity setUserMessage={setUserMessage} /> } />
      </Routes>
    </div>
  );
}

export default App;