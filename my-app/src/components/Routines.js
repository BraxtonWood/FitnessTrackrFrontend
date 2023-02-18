import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Routines = ({token, publicRoutines, setPublicRoutines}) => {
    
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
   useEffect(() => {
        getRoutines();
    }, []);

    const renderHelper = () => {
        if(token){
            return <>
                <div className='mainBodyContainer'>
                    <h1 className='routineTitle'>Public Routines</h1>
                    <h3>Head to My Routines to Create Your Own!</h3>
                    {publicRoutines.map(routines => <div className="routinesContainer" key = {routines.id}>
                        <h2 className="routineTitle" >{routines.name}</h2>
                        <div className="routineGoal">Created By: {routines.creatorName}</div>
                        <div className="routineInfoAndActivityDescription">Goal: {routines.goal}</div>
                        <h3 className="publicRoutinesActivitiesTitle">Activities:</h3>
                        <div>{routines.activities.map(activity => 
                            <div className='activitiesContainer' key={activity.routineActivityId}>
                                <h4 className="activityTitle">{activity.name}</h4>
                                <p className="activityInfo">Description: {activity.description}</p>
                                <p className="activityInfo">Duration: {activity.duration}</p>
                                <p className="activityInfo">Count: {activity.count}</p>
                            </div>
                            )}</div>
                    </div>)}
                    
                </div>
            </>
        } else {
            return <>
                <div className='mainBodyContainer'>
                    <h1 className='routineTitle'>Public Routines</h1>
                    <h3>Log in or Sign Up To Create Your Own</h3>
                    {publicRoutines.map(routines => <div className="routinesContainer" key = {routines.id}>
                        <h2 className="routineTitle" >{routines.name}</h2>
                        <div className="routineGoal">Created By: {routines.creatorName}</div>
                        <div className="routineInfoAndActivityDescription">Goal: {routines.goal}</div>
                        <h3 className="publicRoutinesActivitiesTitle">Activities:</h3>
                        <div>{routines.activities.map(activity => 
                            <div className='activitiesContainer' key={activity.routineActivityId}>
                                <h4 className="activityTitle">{activity.name}</h4>
                                <p className="activityInfo">Description: {activity.description}</p>
                                <p className="activityInfo">Duration: {activity.duration}</p>
                                <p className="activityInfo">Count: {activity.count}</p>
                            </div>
                        )}</div>
                    </div>)}
                </div>
            </>
        }
    }
    
    return(
        <>
            {renderHelper()}
        </>
    );
}
export default Routines;