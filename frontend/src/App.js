import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './components/context/notes/NoteState';
import Login from './components/login';
import Signup from './signup';

import Alert from './components/Alert';

function App() {
  
  const [alert,setAlert]=useState(null);
 

  const showAlert=(message,type)=>{
 setAlert({
 message:message,
 type:type}
 );
 
 setTimeout(() => {
   setAlert(null);
 },1500);
  }
  
  


  return (
  <>

<NoteState>
<BrowserRouter>
<Navbar/>
<Alert alert={alert}/>
<div className="container">
      <Routes>
      
        <Route exact  path="/" element={<Home  showAlert={showAlert}/>} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/> } />

      </Routes>
      </div>
    </BrowserRouter>

</NoteState>

    
  
     </>
  );
}

export default App;
