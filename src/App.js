import React from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import Home from './pages/Home';
import Courses from './pages/Courses'
import Navbar from './components/Navbar'
import Users from './pages/PersonalPage'
import './App.css'
import {
  MDBContainer,
} from 'mdbreact';
function App() {
  return (
      <>
      <Navbar/>
      <MDBContainer>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/user" component={Users}/>
      </Switch>
      </MDBContainer>
      </>
  );
}

export default App;
