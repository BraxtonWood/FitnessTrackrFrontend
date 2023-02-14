import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import User from "./components/User";
import Routines from "./components/Routines";
import Activities from "./components/Activities";

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
