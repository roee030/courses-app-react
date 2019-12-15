import React from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import Home from './pages/Home';
import Courses from './pages/Courses'
import Signin from './pages/Sign-in'
import Register from './pages/Register'
import ErrorPage from './components/ErrorPage'
import SingleCourse from './pages/SingleCourse'
import './App.css'
import { MDBContainer } from 'mdbreact';
import Footer from './components/Footer'
import ResetPassword from './pages/ResetPassword'
function App() {
  return (
    <div>
      <MDBContainer fluid>      
      <Switch>

        <Route exact path="/" component={Home}/>
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/courses/:id" component={SingleCourse}/>
        <Route exact path="/log-in" component={Signin}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/resetpassword" component={ResetPassword}/>

        <Route component={ErrorPage}/>
      </Switch>
      
      </MDBContainer>
      <Footer/>
    </div>
  );
}

export default App;
