import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';


function NewRoutine({ token, setToken, setUserMessage, routineId, setRoutineId, userMessage}) {
    const [name, setName]= useState("")
    const [goal, setGoal]= useState("")
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
                  id: routineId,
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
        <h3 className="pageTitle">{userMessage}</h3>
        <form onSubmit={handleSubmit} className="form">
            <label>Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setName(event.target.value)} /><br/>
            <label>Goal</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setGoal(event.target.value)} /><br/>
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