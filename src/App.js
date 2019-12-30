import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import User from './pages/user/containers/User';
import ErrorPage from './components/ErrorPage';
import Course from './pages/course/containers/Course';
import './App.css';
import { MDBContainer } from 'mdbreact';
import Footer from './components/Footer';
import ResetPassword from './pages/ResetPassword';
import AppContext from './store/AppContext';
import reducers from './store/reducers';

function App() {
    const context = useContext(AppContext);
    const [myUser, dispatchMyUser] = useReducer(reducers.users.updateMyUser, context.myUser);
    const [users, dispatchUsers] = useReducer(reducers.users.updateUsers, context.users);
    const [courses, dispatchCourses] = useReducer(reducers.courses.updateCourses, context.courses);
    return (
    <div>
        <AppContext.Provider value={context}>
            <Header myUser={myUser} dispatchMyUser={dispatchMyUser} />
            <MDBContainer fluid>   
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/users/:id" render={(props) => <User {...props} 
                        myUser={myUser}
                        users={users}
                        courses={courses}
                        dispatchCourses={dispatchCourses} />}/>
                    <Route exact path='/courses/:id' render={(props) => <Course {...props} 
                        myUser={myUser}
                        users={users}
                        courses={courses} />} />
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
