import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useContext} from 'react'
import { Home } from './components/pages/Home';
import  Login  from '../src/components/pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import {NavBar} from "../src/components/NavBar";
import {AppContext} from "../src/components/services/context";

function App() {
  const {authrization} = useContext(AppContext);
  const [auth] = authrization
  return (

 
<Router>
<NavBar/>
<Routes>

  <Route exact path="/" element={  auth ? <Home/> : <Navigate to='/login'/>}/> 


<Route path="/login"  element={<Login />}/>
</Routes>
</Router>

  )
}

export default App;
