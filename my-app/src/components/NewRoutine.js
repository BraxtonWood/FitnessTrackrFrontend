import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function NewRoutine({token, setUserMessage}) {
    const [name, setName]= useState("")
    const [goal, setGoal]= useState("")
    const [isPublic, setIsPublic] = useState(false)
    setUserMessage("")
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('https://fitness-tracker-backend.onrender.com/api/routines', {
            method: "POST",
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
                setUserMessage("Thanks for creating a routine we are loading your routines so you can add some activities and get moving!!")
                setName("");
                setGoal("");
                navigate("/mymessages");
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Create a new routine </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setName(event.target.value)} required/><br/>
            <label>Goal</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setGoal(event.target.value)} required/><br/>
            <div className="isPublic">
                <input type="checkbox" onChange={(event) => setIsPublic(true)}/><br/>
                <label>Is this a public routine?</label>
            </div>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default NewRoutine;
