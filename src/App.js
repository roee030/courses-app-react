import React from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import Home from './pages/Home';
import Courses from './pages/Courses'
import Navbar from './components/Navbar'
import Signin from './pages/Sign-in'
import Register from './pages/Register'
import ErrorPage from './components/ErrorPage'
import SingleCourse from './pages/SingleCourse'
import './App.css'
import {
  MDBContainer,
} from 'mdbreact';
import Footer from './components/Footer'
import ResetPassword from './pages/ResetPassword'
function App() {
  return (
      <>
      
      <Navbar/>
      <MDBContainer fluid>      
      <Switch>

        <Route exact path="/" component={Home}/>
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/courses/:id" component={SingleCourse}/>
        <Route path="/log-in" component={Signin}/>
        <Route path="/register" component={Register}/>
        <Route path="/resetpassword" component={ResetPassword}/>

        <Route component={ErrorPage}/>
      </Switch>
      
      </MDBContainer>
      <Footer/>
      </>
  );
}

export default App;
