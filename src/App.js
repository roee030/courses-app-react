import React, { useContext} from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import User from './pages/user/containers/User';
// import Signin from './components';
// import Register from './pages/Register';
import ErrorPage from './components/ErrorPage';
import Course from './pages/course/containers/Course';
import './App.css';
import { MDBContainer } from 'mdbreact';
import Footer from './components/Footer';
import ResetPassword from './pages/ResetPassword';
import AppContext from './store/AppContext';

function App() {
    const context = useContext(AppContext);
    return (
    <div>
      <AppContext.Provider value={context}>

      <Header/>
      <MDBContainer fluid>   
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/user" component={User}/>
        <Route exact path="/courses/:id" component={Course}/>
        {/* <Route exact path="/log-in" component={Signin}/> */}
        {/* <Route exact path="/register" component={Register}/> */}
        <Route exact path="/resetpassword" component={ResetPassword}/>

        <Route component={ErrorPage}/>
      </Switch>
      
      </MDBContainer>
      
      <Footer/>
    </AppContext.Provider>

    </div>
  );
}

export default App;
