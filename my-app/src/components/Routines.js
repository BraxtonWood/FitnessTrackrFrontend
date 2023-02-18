/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Routines = ({token, publicRoutines, setPublicRoutines}) => {
    const[searchTerm, setSearchTerm] = useState('');
    const[displayRoutines, setDisplayRoutines] = useState(publicRoutines);
    console.log("displayRoutines:",displayRoutines);

    const getRoutines = () => {
        console.log("getRoutines called");
        fetch('https://fitness-tracker-backend.onrender.com/api/routines', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log("result", result);
            setPublicRoutines(result);
          })
          .catch(console.error);
    }

    const postMatches = (routine, searchTerm) =>{
        if(searchTerm === ""){
            return routine
        }
        else if((routine.name.toLowerCase()).includes(searchTerm.toLowerCase())){
            return routine
        }
        else if((routine.goal.toLowerCase()).includes(searchTerm.toLowerCase())){
            return routine
        }
        else if((routine.creatorName.toLowerCase()).includes(searchTerm.toLowerCase())){
            return routine
        }
    }

    const searchAndDisplay = (event) =>{
        if(event){
            event.preventDefault();
        }
        
        setDisplayRoutines(publicRoutines.filter(routine => postMatches(routine, searchTerm)))
    }
    const searchUserOnclick = async (creatorName) =>{
        console.log("searchUser", creatorName);
        setSearchTerm(creatorName);
        
        
        searchAndDisplay();

    }
   useEffect(() => {
        getRoutines();
        searchAndDisplay();
    },[]);

    const renderHelper = () => {
        return <>
            <div className='mainBodyContainer' >
                <h1 className='routineTitle'>Public Routines</h1>
                {(token) && <h3>Head to My Routines to Create Your Own!</h3>}
                {(!token) && <h3>Log in or Sign Up To Create Your Own</h3>}
                <form className='searchBarContainer' onSubmit={searchAndDisplay}>
                    <input type="text" className='searchBar' placeholder="Search" value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}></input>
                    <button type="submit" className="userControlsLoginLinkLeft">Search</button>
                    <button type="submit" className="userControlsLoginLinkLeft" onClick={()=>{
                    setSearchTerm('');
                    setDisplayRoutines(publicRoutines);
                    }}>Clear</button>
                </form>
                <div className='routineList'>
                    {displayRoutines.map(routines => <div className="routinesContainer" key = {routines.id}>
                        <h2 className='routineTitle' >{routines.name}</h2>
                        <a className="routineGoal" onClick={()=>{
                            searchUserOnclick(routines.creatorName);  
                        }}>Created By:{routines.creatorName}</a>
                        <div className='routineInfoAndActivityDescription' >Goal: {routines.goal}</div>
                            <h4 className="publicRoutinesActivitiesTitle">Activities</h4>
                            <div>{routines.activities.map(activity => 
                                <div className='activitiesContainer' key={activity.routineActivityId}>
                                    <h4 className="activityTitle">{activity.name}</h4>
                                    <p className="activityInfo">Description: {activity.description}</p>
                                    <p className="activityInfo">Duration: {activity.duration}</p>
                                    <p className="activityInfo">Count: {activity.count}</p>
                                </div>
                            )}</div>
                        </div>
                    )}
                </div>            
            </div> 
        </>

    }
    
    return( <>

        {/* <div className='header'>
    
        <Header className="App" element></Header>
     
        </div> */}
        <div>

            {renderHelper()}
        </div>

        </>
    );
}
export default Routines;