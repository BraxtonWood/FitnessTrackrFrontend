import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
//import {Routes, Route} from 'react-router-dom';
//import Home from "./Home";
//import User from "./User";
//import Routines from "./Routines";
//import Activities from "./Activities";
//import Header from "./Header";


const Routines = ({token, publicRoutines, setPublicRoutines}) => {
    const[searchTerm, setSearchTerm] = useState('');
    const[displayRoutines, setDisplayRoutines] = useState(publicRoutines);
    console.log("displayRoutines:",displayRoutines);

    const getRoutines = () => {
        console.log("getRoutines called");
        //'http://fitnesstrac-kr.herokuapp.com/api/routines'
        //'https://fitness-tracker-backend.onrender.com/api/routines'
        fetch('https://fitness-tracker-backend.onrender.com/api/routines', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log("result", result);
            setPublicRoutines(result);
            setDisplayRoutines(result);
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

    const searchAndDisplay = async (event) =>{
        console.log("searchAndDisplay");
        if(event){
            event.preventDefault();
        }
        
        setDisplayRoutines(publicRoutines.filter(routine => postMatches(routine, searchTerm)))
    }
    // const searchUserOnclick = async () =>{
    //     console.log("searchUser");
    //     //setSearchTerm(creatorName);
    //     searchAndDisplay();

    // }
   useEffect(() => {
        getRoutines();
        searchAndDisplay();
        //searchUserOnclick()
    }, []);

    const renderHelper = () => {
        //getRoutines()
        // if(publicRoutines=[]){
        //     return <>
        //     <h4>...Loading</h4>
        //     </>
        // }
        if(token){
            return <>
                    <h4>Head to My Routines to Create Your Own!</h4>
                    <Link to='/myroutines'> 
                        <button type="button" className="submitButton">
                            My Routines
                        </button>
                    </Link>
                    <div className='routineList'>
                    {displayRoutines.map(routines => <div className="routineItem" key = {routines.id}>
                        <h3>{routines.name}</h3>
                        <a onClick={()=>{
                            setSearchTerm(routines.creatorName);
                            searchAndDisplay();  
                           }}>Created By:{routines.creatorName}</a>
                        <div>Goal:{routines.goal}</div>
                        <h4>Activities:</h4>
                                <div>{routines.activities.map(activity => 
                                    <div className='activityItem' key={activity.routineActivityId}>
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
                <h2>Log in or Sign Up To Create Your Own</h2>
                <Link to='/signup'> 
                    <button type="button" className="submitButton">
                        Sign In
                    </button>
                </Link>
                <Link to='/login'>
                    <button type="button" className="submitButton" >
                        Log In
                    </button>
                </Link>
            
                <div className='routineContainer'>
                    {displayRoutines.map(routines => <div className="routineItem" key = {routines.id}>
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

        <div className='routineHeader'>
                <h1 className='routineTitle'>Public Routines:</h1>
            </div>
        <form onSubmit={searchAndDisplay}>
            <input type="text" placeholder="Search" value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}></input>
            <button type="submit" className="submitButton">Search</button>
            <button type="submit" className="submitButton" onClick={()=>{
                setSearchTerm('');
                setDisplayRoutines(publicRoutines);
            }}>Clear</button>
        </form>
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