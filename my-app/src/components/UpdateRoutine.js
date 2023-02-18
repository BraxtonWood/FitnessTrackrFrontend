import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';



function NewRoutine({token, setUserMessage, routineId, setRoutineId, userMessage, routineGoal, routineName}) {
    const [name, setName]= useState()
    const [goal, setGoal]= useState()

    const [isPublic, setIsPublic] = useState(false)
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`https://fitness-tracker-backend.onrender.com/api/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${ token }`
            },
            body: JSON.stringify(
                {
                  name: name,
                  goal: goal,
                  isPublic: isPublic
                }
            )
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.creatorId) { 
                setUserMessage(`${result.name} was successfully updated`)
                setName("");
                navigate("/mymessages");
                setUserMessage("")
                setRoutineId("")
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Update your routine </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" defaultValue={routineName} onChange={(event) => setName(event.target.value)} onSubmit={(event) => setName(event.target.value)} required/><br/>
            <label>Goal</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" defaultValue={routineGoal} onChange={(event) => setGoal(event.target.value)} onSubmit={(event) => setGoal(event.target.value)} required/><br/>
            <div className="isPublic">
                <input type="checkbox" onChange={(event) => setIsPublic(true)}/><br/>
                <label>Is this a public routine?</label>
            </div>
            
            <Link to='/myroutines'>
                <input className="submitButton" type="submit" value='Submit'></input>
            </Link>
            
        </form>
    </div>
  );
}

export default NewRoutine;