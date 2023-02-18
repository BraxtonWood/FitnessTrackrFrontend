/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';


const Activities = ({token, activities, setActivities, setActivityId, setActivityDescription, setActivityName}) => {
    
    const getActivities = () => {
        

        console.log("getActivities called");
        console.log(token)
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
    },[]);
    
    const activitiesRenderHelper = () => {
        console.log("activities:",activities)
        if(!activities){
        return <>
            <p>Loading Activities....</p>
        </>
        } else {
            return <>
                <div className="mainBodyContainer">
                    {(token) && <Link to='/newactivity'> Create New Activity</Link>}
                    {(!token) && <>
                        <h3>Log in or Sign Up To Create Your Own Activities</h3>
                    </>}
                    <div className='mainActivitiesContainer'>
                        {activities.map(activity => 
                            <div className="activityContainer" key = {activity.id}>
                                <h3 className='activitiesFromActivitiesTitle'>{activity.name}</h3>
                                <p>Description: {activity.description}</p> 
                                {(token) && <Link to='/updateActivity'> 
                                <button className="edit_add_buttons" type="button" onClick={()=> {
                                    setActivityId(activity.id); 
                                    setActivityName(activity.name); 
                                    setActivityDescription(activity.description)}}>
                                    Edit Activity
                                </button>       
                                </Link>}          
                            </div>)
                        }   
                    </div>  
                </div>
            </>
        }
    }

    
    return(<>
        
        <div className='mainBodyContainer'>
            <h1 className='pageTitle'>Activities</h1>
            </div>
        <div>  
            {activitiesRenderHelper()}
            </div>
        </>
    );
}
export default Activities;