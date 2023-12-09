import logo from './logo.svg';
import './App.css';

import Login from './Components/Login';
import Home from './Components/Home.js';
import React from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Registeration from './Components/Registeration.js';
import OverviewComponent from './Components/OverviewComponent.js';
import { AuthProvider } from './Components/AuthContext.js';
import Navbar from './Components/Navbar.js';
function App() {
  // const [transcations, setTransactions] = useState([]);
  // const addTransaction = (newTransaction) => {
  //   // Update the transactions array with the new transaction
  //   setTransactions([...transcations, newTransaction]);
  // };

  return (
   <>
   
   <Router>
   <AuthProvider>
    <Navbar/>
      <Routes>
        < Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Registeration/>}/>
        <Route path='/et' element={<OverviewComponent/>}/>
    
      </Routes>
      </AuthProvider>
  </Router>
  

   </>
  );
}

export default App;
