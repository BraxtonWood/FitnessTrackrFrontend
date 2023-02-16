import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

const MyRoutines = ({username, token}) =>{
    const[user, setUser] = useState('');
    const[userRoutines, setUserRoutines] = useState([]);
    const[routineToEdit, setRoutineToEdit] = useState({});
    const getUserRoutines = async () => {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
            headers: {
              'Content-Type': 'application/json',
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
            }else if (userRoutines = []){
                return <>
                <div className='routineList'>
                {userRoutines.map(routine => <div className="routine" key = {routine.id}>
                    <h3>{routine.name}</h3>
                    <div>IsPublic?: {routine.isPublic}</div>
                    <div>Goal: {routine.goal}</div>
                    {/* CHANGE LINK TO EDIT POPUP */}
                    <Link to='/signIn'> 
                        <button type="button" onClick={()=> {setRoutineToEdit(routine.id)}}>
                            Edit
                        </button>
                    </Link>
                    <h4>Activities:</h4>
                        <div>{routine.activities.map(activity => 
                            <div className='Activity' key={activity.routineActivityId}>
                                <h4>{activity.name}</h4>
                                <p>Description: {activity.description}</p>
                                <p>Duration: {activity.duration}</p>
                                <p>Count: {activity.count}</p></div>)}
                        </div>
                        </div>
                            )}

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