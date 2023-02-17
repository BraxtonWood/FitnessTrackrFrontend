import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function NewActivity({token, setUserMessage}) {
    const [name, setName]= useState("")
    const [description, setDescription]= useState("")
    setUserMessage("")
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('https://fitness-tracker-backend.onrender.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                  name: name.trim(),
                  description: description,
                }
            )
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.id) { 
                setUserMessage("Thanks for creating an activity!!")
                setName("");
                setDescription("");
                navigate("/mymessages");
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Create a new activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setName(event.target.value)} required/><br/>
            <label>Description</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setDescription(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default NewActivity;