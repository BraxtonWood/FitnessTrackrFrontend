import React, {useEffect, useState} from 'react';
//import {Link} from 'react-router-dom';
//import {Routes, Route} from 'react-router-dom';
//import Home from "./Home";
//import User from "./User";
//import Routines from "./Routines";
//import Activities from "./Activities";
import Header from "./Header";


const Routines = ({token}) => {
    const [publicRoutines, setPublicRoutines] = useState([]);
    const [newRoutine, setNewRoutine] = useState({})
   
    const fetchPublicRoutines = async () => {
        const response = await fetch('https://fitness-tracker-backend.onrender.com/api/routines', {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
            .then(result => {

              console.log("get PublicRoutines:",result);
              setPublicRoutines(result);
            })
            .catch(console.error);
    } 
    useEffect(() => {
        fetchPublicRoutines();
    }, []);
     //fetchPublicRoutines();
    const renderHelper = () => {
        if(token){
            return <>
            <h1 className='routineTitle'>Public Routines:</h1>
            <div className='routineList'>
            <h4>Create New Routine LINK</h4>
                

                    {publicRoutines.map(routines => <div className="routine" key = {routines.id}>
                        <h3>{routines.name}</h3>
                        <div>Created By:{routines.creatorName}</div>
                        <div>Goal:{routines.goal}</div>
                        <h4>Activities:</h4>
                                <div>{routines.activities.map(activity => 
                                    <div className='Activity' key={activity.routineActivityId}>
                                        <h4>{activity.name}</h4>
                                        <p>Description:{activity.description}</p>
                                        <p>Duration:{activity.duration}</p>
                                        <p>Count:{activity.count}</p>
                                    </div>
                                )}
                                </div>
                                </div>
                                )}

            </div>
            </>
        } else {
            return <>
            <h1 className='routineTitle'>Public Routines:</h1>
            <div className='routineList'>
                
                
                    {publicRoutines.map(routines => <div className="routine" key = {routines.id}>
                        <h3>{routines.name}</h3>
                        <div>Created By:{routines.creatorName}</div>
                        <div>Goal:{routines.goal}</div>
                        <h4>Activities:</h4>
                                <div>{routines.activities.map(activity => 
                                    <div className='Activity' key={activity.routineActivityId}>
                                        <h4>{activity.name}</h4>
                                        <p>Description:{activity.description}</p>
                                        <p>Duration:{activity.duration}</p>
                                        <p>Count:{activity.count}</p>
                                    </div>
                                )}
                                </div>
                                </div>
                                )}

            </div>
            </>
        }
    }
    return(

        <>
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