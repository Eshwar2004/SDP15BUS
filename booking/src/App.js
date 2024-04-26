import './App.css';
import Header from './components/Header';
import {  Route,Routes } from 'react-router-dom'; 
import Home from './components/Home';
import Tickets from './components/Tickets';
import Login from './components/Login';
import SignUp from './components/Signup';
import BusForm from './components/admin';
import Contactus from './components/Contactus';
import Travel from './components/BookInterface';
import SeatSelection from './components/selectseats';
import Logout from './components/Logout';
import SeatVacancy from './components/seatvacancy';
//import { Upload } from '@mui/icons-material';
import Upload from './components/upload';
import Userhome from './components/userhome';
import Busedit from './components/Busedit';
import Contactvie from './components/contactvie'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Navigate } from 'react-router-dom';
import OtpMailAndVerification from './components/otplogin';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async () => {
    try {
      const credentials = { username: 'test', password: 'password' };
      const response = await axios.post('http://localhost:3000/server/auth/signin', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const ProtectedRoute = ({ path, element }) => {
    return token ? <Route path={path} element={element} /> : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/logout" element={<Logout logout={logout} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
    < Route path="/" element={<Home/>} /> 
    <Route path="/home" element={<Home/>} /> 
    <Route path="/Tickets" element={<Tickets/>} />
    <Route path="/Travel" element={<Travel/>} />
    <Route path="/SignUp" element={<SignUp/>} />
    <Route path='/busedit' element={<Busedit/>}/>

    <Route path="/Contactus" element={ <Contactus/> }/>
    <Route path="/Seatvacancy" element={ <SeatVacancy/> }/>
    <Route path="/upload" element={<Upload/>}/>

    <Route path="/SeatSelection" element={ <SeatSelection/> }/>
    <Route path="/Userhome" element={ <Userhome/> }/>
    
    <Route path="/admin" element={ <BusForm/> }/>
    <Route path='/Contactvie' element={ <Contactvie/>}/>

    <Route path="/OtpMailAndVerification" element={<OtpMailAndVerification/>} />
    </Routes> 
    </div>
  );
}


export default App;