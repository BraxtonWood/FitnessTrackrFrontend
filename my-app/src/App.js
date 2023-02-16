import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
// import User from "./components/User";
import Routines from "./components/Routines";
import Header from './components/Header';
import Login from './components/Login';
import Activities from "./components/Activities";
import SignUp from "./components/SignUp";

function App() {
  return (<div>
    
    <Header className="App"/>
      {/* <Routes>
        <Route path="/" element={ <Home/> } />

        <Route path="/routines" element={ <Routines /> } />
        <Route path="/activities" element={ <Activities /> } />

         <Route path="/user" element={ <User /> } />  
  </Routes> */}
      
    </div>
  );
}

export default App;
