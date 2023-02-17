import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function NewRoutine({token, setUserMessage, routineId, setRoutineId, userMessage}) {
    const [name, setName]= useState("")
    const [goal, setGoal]= useState("")
    const [isPublic, setIsPublic] = useState(false)
    let navigate = useNavigate();
    //!! take this out only for testing 
    setRoutineId(8)
    console.log("🚀 ~ file: UpdateRoutine.js:6 ~ NewRoutine ~ token", token)

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
                  routineId: routineId,
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
                setUserMessage("We updated your routine we are loading your routines so you can add some activities and get moving!!")
                setName("");
                setGoal("");
                //! i want to look at a set timeout for this
                // navigate("/mymessages");
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
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default NewRoutine;