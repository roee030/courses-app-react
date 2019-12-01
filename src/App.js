import React from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import Home from './pages/Home';
import Courses from './pages/Courses'
import Navbar from './components/Navbar'
import Users from './pages/PersonalPage'
import './App.css'
function App() {
  return (
      <>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/user" component={Users}/>
      </Switch>
      </>
  );
}

export default App;
