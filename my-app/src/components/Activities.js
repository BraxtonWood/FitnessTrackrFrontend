import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


const Activities = ({token, activities, setActivities}) => {
    const getActivities = () => {
        console.log("getActivities called");
        //'http://fitnesstrac-kr.herokuapp.com/api/activities'
        //'https://fitness-tracker-backend.onrender.com/api/activities'
        fetch('https://fitness-tracker-backend.onrender.com/api/activities', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log("activities result:", result);
            setActivities(result);
          })
          .catch(console.error);
    }
   useEffect(() => {
        getActivities();
    }, []);
    
    const renderHelper = () => {
        if(token){
            return <>
                <Link to='/newactivity'> 
                        <button type="button">
                            Create New Activity
                        </button>
                </Link>
         
        </> 
        } else {
            return <>
                <h2>Log in or Sign Up To Create Your Own Activities</h2>
                <Link to='/signup'> 
                    <button type="button">
                        Sign In
                    </button>
                </Link>
                <Link to='/login'>
                    <button type="button">
                        Log In
                    </button>
                </Link>
            
            </>

        }
    }
    const activitiesRenderHelper = () => {
        console.log("activities:",activities)
        if(!activities){
        return <>
            <p>Loading Activites....</p>
        </>
        } else {
            return <>
                {activities.map(activity => 
                    <div className="activityItem" key = {activity.id}>
                        <h3>{activity.name}</h3>
                        <p>Name: {activity.goal}</p>
                        <p>Description: {activity.description}</p>                   
                    </div>)}
            </>
        }
    }

    
    return(<>
        
        <div className='routineHeader'>
            <h1 className='routineTitle'>All Activities:</h1>
            </div>
        <div className='userHelperHeader'>{renderHelper()}
            </div>
        <div className='activityContainer'>  
            {activitiesRenderHelper()}
            {/* {activities.map(activity => 
                <div className="activity" key = {activity.id}>
                    <h3>{activity.name}</h3>
                    <p>Name: {activity.goal}</p>
                    <p>Description: {activity.description}</p>                   
                </div>)} */}
            </div>
        
       
            
        </>
    );
}
export default Activities;