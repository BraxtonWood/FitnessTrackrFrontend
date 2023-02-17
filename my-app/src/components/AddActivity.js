import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {getAllActivities} from "../api"


function AddActivity({token, setUserMessage}) {
    const [activityId, setActivityId] = useState("")
    const [count, setCount]= useState("")
    const [duration, setDuration]= useState("")
    const [allActivities, setAllActivities] = useState([])
    const [activity, setActivity] = useState({})
    let routineId = 6
    console.log(allActivities)
    
    // setUserMessage("")
    let navigate = useNavigate();


    useEffect(() => {  
        fetch('https://fitness-tracker-backend.onrender.com/api/activities', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(result => {
            setAllActivities(result);
        })
        .catch(err=>console.error(err));

    },[]);


    const handleSubmit = (event) => {
        event.preventDefault()
        const activityId = activity[0].id
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
            console.log(result)
            // if (result) { 
            //     console.log(result)
            //     // setUserMessage("Thanks for creating an activity!!")
            //     setActivityId("")
            //     setCount("");
            //     setDuration("");
            // }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Add an Activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Choose an Activity</label><br/>
            <select 
            className="selectActivity" 
            onChange={(event)=>setActivity(allActivities.filter((activity) => activity.name === event.target.value))}> 
                {allActivities.map((activity, index) =>
                <option key={ `${ index }:${ activity.name }`}>{activity.name}</option>)}
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