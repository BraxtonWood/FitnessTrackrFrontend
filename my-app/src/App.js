import './App.css';
import React, { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from "./components/Home";
import Routines from "./components/Routines";
import Activities from "./components/Activities";
import MyRoutines from "./components/MyRoutines";
import Login from './components/Login';
import SignUp from "./components/SignUp";
import NewActivity from './components/NewActivity';
import NewRoutine from './components/NewRoutine';
import AddActivity from './components/AddActivity';
import UpdateRoutine from './components/UpdateRoutine'
import UpdateActivity from './components/UpdateActivity'
import UpdateRoutineActivity from './components/UpdateRoutineActivity'
import MessageUser from './components/MessageUser';


function App() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const [currentUsername, setCurrentUsername] = useState(window.localStorage.getItem("username"));
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [activities, setActivities] = useState([]);
  const [routineId, setRoutineId] = useState("");
  const [routineActivityId, setRoutineActivityId] = useState('');
  const [userRoutines, setUserRoutines] = useState([]);
  const [successStatus, setSuccessStatus] = useState(true);
  const [activityId, setActivityId] = useState("");
  const [activityDescription, setActivityDescription] = useState();
  const [activityName, setActivityName] = useState();
  const [routineGoal, setRoutineGoal] = useState()
  const [routineName, setRoutineName] = useState();
  const [routineActivityCount, setRoutineActivityCount] = useState();
  const [routineActivityDuration, setRoutineActivityDuration] = useState();
  const[displayRoutines, setDisplayRoutines] = useState(publicRoutines);
  const [searchTerm, setSearchTerm] = useState('')

   return (

    <div>
      <Header currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} setToken={setToken} />
      <Routes>

        {/* // *Home Route */}
          <Route path="/" element={ <Home/> } />
 
        {/* // *Main page Routes */}
          <Route path="/routines" element={<Routines token={token} publicRoutines={publicRoutines} setPublicRoutines={setPublicRoutines}  displayRoutines={displayRoutines} setDisplayRoutines={setDisplayRoutines} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> } />
          <Route path="/activities" element={<Activities activities={activities} setActivities={setActivities} token={token} setActivityId={setActivityId} setActivityDescription={setActivityDescription} setActivityName={setActivityName} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> } />
          <Route path="/myroutines" element={<MyRoutines userRoutines={userRoutines} routineActivityId={setRoutineActivityId} setRoutineActivityId={setRoutineActivityId} setUserRoutines={setUserRoutines} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} token={token} setToken={setToken} routineId={routineId} setRoutineId={setRoutineId} setRoutineName={setRoutineName} routineDescription={routineGoal} setRoutineGoal={setRoutineGoal} setRoutineActivityCount={setRoutineActivityCount} setRoutineActivityDuration={setRoutineActivityDuration}/>}/>

        {/* // *User form Routes */}
          <Route path="/login" element={<Login username={username} setSuccessStatus={setSuccessStatus}  setUsername={setUsername} password={password} setPassword={setPassword} token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} setUserMessage={setUserMessage} />} />
          <Route path="/signup" element={<SignUp username={username} setSuccessStatus={setSuccessStatus}  setUsername={setUsername} password={password} setPassword={setPassword} setCurrentUsername={setCurrentUsername} setToken={setToken} setUserMessage={setUserMessage} />} />

        {/* // *Create form Routes */}
          <Route path="/newactivity" element={<NewActivity setUserMessage={setUserMessage} setSuccessStatus={setSuccessStatus} /> } />
          <Route path="/newroutine" element={<NewRoutine setSuccessStatus={setSuccessStatus} token={token} setUserMessage={setUserMessage} setToken={setToken} /> } />
          <Route path="/addactivity" element={<AddActivity setActivities={setActivities} activities={activities} setUserMessage={setUserMessage} setSuccessStatus={setSuccessStatus} routineId={routineId} setRoutineId={setRoutineId} /> } />

        {/* // *Update form Routes */}
          <Route path="/updateroutine" element={<UpdateRoutine  setSuccessStatus={setSuccessStatus} userRoutines={userRoutines} setUserMessage={setUserMessage} userMessage={userMessage} routineId={routineId} setRoutineId={setRoutineId} token={token} routineName={routineName} routineGoal={routineGoal} /> } />
          <Route path="/updateactivity" element={<UpdateActivity setActivityId={setActivityId} activityId={activityId} setUserMessage={setUserMessage} setSuccessStatus={setSuccessStatus}  activityName={activityName} activityDescription={activityDescription} />}/>
          <Route path="/updateroutineactivity" element={<UpdateRoutineActivity setRoutineActivityId={setRoutineActivityId} setUserMessage={setUserMessage} setSuccessStatus={setSuccessStatus}  routineActivityId={routineActivityId} token={token} routineActivityCount={routineActivityCount} routineActivityDuration={routineActivityDuration}/> }/> 

        {/* // *User Messages Routes */}
          <Route path="/mymessages" element={<MessageUser successStatus={successStatus} currentUsername={currentUsername} userMessage={userMessage}/>}/>

        
      </Routes>
    </div>
  );
}

export default App;

  //username, setUsername, password, setPassword, token, setToken, currentUsername, setCurrentUsername, publicRoutines, setPublicRoutines, userMessage, setUserMessage, activities, setActivities, routineId, setRoutineId, userRoutines, setUserRoutines, successStatus, setSuccessStatus,
  //username={} setUsername={} password={} setPassword={} token={} setToken={} currentUsername={} setCurrentUsername={} publicRoutines={} setPublicRoutines={} userMessage={} setUserMessage={} activities={} setActivities={} routineId={} setRoutineId={} userRoutines={} setUserRoutines={} successStatus={} setSuccessStatus={}
