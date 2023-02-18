   //username={} setUsername={} password={} setPassword={} token={} setToken={} currentUsername={} setCurrentUsername={} publicRoutines={} setPublicRoutines={} userMessage={} setUserMessage={} activities={} setActivities={} routineId={} setRoutineId={} userRoutines={} setUserRoutines={} successStatus={} setSuccessStatus={}
   import React, { useState } from "react";
   import { useNavigate } from "react-router-dom";
   // import {getAllActivities} from "../api"
   
   
   function UpdateRoutineActivity({setUserMessage, userMessage, routineActivityId, token, routineActivityCount, routineActivityDuration, setSuccessStatus }) {
      const [count, setCount]= useState()
      const [duration, setDuration]= useState()
   
      let navigate = useNavigate();
   
   
      const handleSubmit = (event) => {
         event.preventDefault()
         console.log(routineActivityId)
   
         fetch(`https:fitness-tracker-backend.onrender.com/api/routine_activities/${routineActivityId}`, {
            method: "PATCH",
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
              {
                  count: count,
                  duration: duration,
              }
            )
         }) 
         .then(response => response.json())
         .then(result => {
            console.log(result)
            setCount("");
            setDuration("")
            if (result.id) { 
               setSuccessStatus(true)
               setUserMessage(`Your routine activity was updated`)
               navigate("/mymessages");
            }else {
               setSuccessStatus(false)
               setUserMessage("There was an error when updating your routine activity. Please try again")
               navigate("/mymessages");
            }
         })
         .catch(err=>console.error(err));
      }  
   
     return (
       <div className="logIn_signUp_create_edit_container">
           <h1 className="pageTitle">Edit Routine Activity </h1>
           <form onSubmit={handleSubmit} className="form">
               <label>Duration</label><br/>
               <input className="logIn_signUp_create_edit_entry" type="text" defaultValue={routineActivityDuration} onChange={(event) => setDuration(event.target.value)} onSubmit={(event) => setDuration(event.target.value)}  required/><br/>
               <label>Count</label><br/>
               <input className="logIn_signUp_create_edit_entry" type="text" defaultValue={routineActivityCount} onChange={(event) => setCount(event.target.value)} onSubmit={(event) => setCount(event.target.value)} required/><br/>
               <input className="submitButton" type="submit" value='Submit'></input>
           </form>
       </div>
     );
   }
   
   export default UpdateRoutineActivity;