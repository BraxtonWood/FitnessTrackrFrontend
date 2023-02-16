import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
//import {Routes, Route} from 'react-router-dom';
//import Home from "./Home";
//import User from "./User";
//import Routines from "./Routines";
//import Activities from "./Activities";
import Header from "./Header";


const Routines = ({token},{publicRoutines}, {setPublicRoutines}) => {
    
    const getRoutines = () => {
        fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log(result);
            setPublicRoutines(result);
          })
          .catch(console.error);
    }
   

    const renderHelper = () => {
        if(publicRoutines=[]){
            return <>
            <h4>...Loading</h4>
            </>
        }
        if(token){
            return <>
            <div className='routineHeader'>
            <h1 className='routineTitle'>Public Routines:</h1>
            <div className='routineList'>
            <Link to='/myroutines'> 
                    <button type="button">
                        Head to My Routines to Create Your Own!
                    </button>
                </Link>
            </div>    

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
            <div className='routineHeader'>
                <h1 className='routineTitle'>Public Routines:</h1>
                <h2>Log in or Sign Up To Create Your Own</h2>
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