import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {getAllActivities} from "../api"


function AddActivity({setUserMessage, routineId}) {
    const [count, setCount]= useState("")
    const [duration, setDuration]= useState("")
    const [allActivities, setAllActivities] = useState([])
    const [activity, setActivity] = useState({})
    console.log(allActivities)
    console.log(activity)
    
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

        if(activity.length > 0 ){
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
                if (result.id) { 
                    console.log(result)
                    setUserMessage("Your activity was added")
                    setCount("");
                    setDuration("");
                }
            })
            .catch(err=>console.error(err));
        } else {
            console.log("you must choose an activity")
        }
    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Add an Activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Choose an Activity</label><br/>
            <select 
            className="selectActivity" 
            onChange={(event)=>setActivity(allActivities.filter((activity) => activity.name === event.target.value))}> 
                <option></option>
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