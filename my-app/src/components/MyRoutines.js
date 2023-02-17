import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

function MyRoutines({ setToken, routineId, setRoutineId, token, currentUsername}){
    //console.log("MyRoutines currentUsername:", currentUsername);
    //console.log("MyRoutines token:", token);
    //console.log("window.getItem: token:", window.localStorage.getItem("token"))
    setToken(window.localStorage.getItem("token"));
    console.log("token:",token);
    //const[user, setUser] = useState('');
    const[userRoutines, setUserRoutines] = useState([]);
    
    
    const getUserRoutines = async () => {
        console.log("fetchUserRoutines:", currentUsername);
        //'http://fitnesstrac-kr.herokuapp.com/api/routines'
        //'https://fitness-tracker-backend.onrender.com/api/users/${username}/routines'
        fetch(`https:fitness-tracker-backend.onrender.com/api/users/${currentUsername}/routines`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ token }`
            },
          }).then(response => response.json())
            .then(result => {
              console.log(result);
              setUserRoutines(result)
            })
            .catch(console.error);
        }
        useEffect(() => {
            getUserRoutines();
        }, []);
        const renderHelper = () => {
            if(!token){
                return <>
                <div className='routineHeader'>
                <h1 className='routineTitle'>My Routines:</h1>
                <h2>Log in or Sign Up To View Personal Routines</h2>
                
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
            </div>
                </>
            }else if (userRoutines){
                return <>
                <div className='routineContainer'>
                <div className='routineList'>
                {userRoutines.map(routine => <div className="routineItem" key = {routine.id}>
                    <h3>{routine.name}</h3>
                    <div>IsPublic: {routine.isPublic.toString()}</div>
                    <div>Goal: {routine.goal}</div>
                    {/* CHANGE LINK TO EDIT POPUP */}
                    <div className="editDeleteButtons">
                    <Link to='/login'> 
                        <button type="button" onClick={()=> {setRoutineId(routine.id)}}>
                            Edit Routine
                        </button>
                    </Link>
                    <Link to='/login'>
                        <button type='button' onClick={()=> {setRoutineId(routine.id)}}>
                            Delete Routine
                        </button>
                    </Link>
                    <Link to='/addactivity'>
                        <button type='button' onClick={()=> {setRoutineId(routine.id)}}>
                            Add Activities
                        </button>
                    </Link>
                    </div>
                    <h4>Activities:</h4>
                        <div>{routine.activities.map(activity => 
                            <div className='Activity' key={activity.routineActivityId}>
                                <h4>{activity.name}</h4>
                                <p>Description: {activity.description}</p>
                                <p>Duration: {activity.duration}</p>
                                <p>Count: {activity.count}</p>
                                <div className="editDeleteButtons">
                                <Link to='/login'> 
                                <button type="button" onClick={()=> {setRoutineId(routine.id)}}>
                                    Edit Activity
                                </button>
                                </Link>
                                <Link to='/login'>
                                <button type='button' onClick={()=> {setRoutineId(routine.id)}}>
                                    Delete Activity
                                </button>
                                </Link>
                                </div>
                                </div>
                                )}
                        </div>
                        </div>
                            )}

                </div>
                </div>
                </>
            }else {
                return <>
                <h1>No Routines? Create One:</h1>
                <Link to='/signup'> 
                    <button type="button">
                       New Routine 
                    </button>
                </Link>
                </>
            }
        }



    return (<>
    <h1>My Routines:</h1>
    <div>{renderHelper()}</div>
    
    </>
    )
}
export default MyRoutines;