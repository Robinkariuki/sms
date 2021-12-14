import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/pages/Home';
import { Login } from '@microsoft/mgt-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AppProvider} from "./components/services/context"



function App() {
  return (
<AppProvider>
<Router>
<Routes>
<Route exact path="/"element={<Home />}/>
<Route path="/login"  element={<Login />}/>
</Routes>
</Router>
</AppProvider>
  )
}

export default App;
