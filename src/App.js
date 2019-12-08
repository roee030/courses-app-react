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
function App() {
  return (
      <>
      

      <MDBContainer>
      <Navbar/>
      <Switch>

        <Route exact path="/" component={Home}/>
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/courses/:id" component={SingleCourse}/>
        <Route path="/sign-in" component={Signin}/>
        <Route path="/register" component={Register}/>
        <Route component={ErrorPage}/>
      </Switch>
      <Footer/>
      </MDBContainer>
      
      </>
  );
}

export default App;
