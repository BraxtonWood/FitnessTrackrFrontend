import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {getAllActivities} from "../api"


function AddActivity({setUserMessage, userMessage, routineId, setRoutineId, activities}) {
    const [count, setCount]= useState("")
    const [duration, setDuration]= useState("")
    const [singleActivity, setSingleActivity] = useState({})
    console.log(singleActivity)

    let navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault()

        if(singleActivity.length > 0 ){
            const activityId = singleActivity[0].id
            console.log(activityId)

            fetch(`https://fitness-tracker-backend.onrender.com/api/routines/${routineId}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                    routineId: routineId,
                    activityId: activityId,
                    count: count,
                    duration: duration,
                    }
                )
            }) 
            .then(response => response.json())
            .then(result => {
                if (result.id) { 
                    console.log(result)
                    setUserMessage("Your singleActivity was added")
                    setCount("");
                    setDuration("");
                    //! I want to look at adding a set timeout to this
                    navigate("/myroutines")
                    setUserMessage("")
                    setRoutineId("")
                }
            })
            .catch(err=>console.error(err));
        } else {
            console.log("you must choose an singleActivity")
        }
    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Add an Activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Choose an Activity</label><br/>
            <select 
            className="selectActivity" 
            onChange={(event)=>setSingleActivity(activities.filter((singleActivity) => singleActivity.name === event.target.value))}> 
                <option></option>
                {activities.map((singleActivity, index) =>
                <option key={ `${ index }:${ singleActivity.name }`}>{singleActivity.name}</option>)}
            </select><br/>
            <label>Count</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setCount(event.target.value)} required/><br/>
            <label>Duration</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setDuration(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default AddActivity;