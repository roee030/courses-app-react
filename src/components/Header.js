  
import React, { useState, useReducer, useContext } from 'react'
import { Link } from "react-router-dom";
import './Header.css'
import { MDBNavbar, MDBBtn } from "mdbreact";

import RegisterPopUp from './RegisterPopUp';
import LoginPopUp from './LoginPopUp';
import ResetPopUp from './ResetPopUp';
import AppContext from '../store/AppContext';
import reducers from '../store/reducers';
import actions from '../store/actions';

export default function Header() {
    const context = useContext(AppContext);
    const [myUser, dispatchMyUser] = useReducer(reducers.users.updateMyUser, context.myUser);
    const [popUp, setPopUp] = useState(null);
   
    return (
        <div>
            <MDBNavbar className="Navbar"  dark expand="md" style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}}>
                {addButtons()}   
            </MDBNavbar>
            {renderPopUp(popUp, setPopUp, dispatchMyUser)}
        </div>
    );

    function addButtons() {
        if (myUser._id) {
            return (
                <div>
                    <Link to={`/users/${myUser._id}`}> My Account</Link>
                    <MDBBtn onClick={() => {dispatchMyUser(actions.users.addMyUser({}))}}>Log-out</MDBBtn>
                </div>
                
            )
        }
    
        return (
            <div>
                <MDBBtn onClick={() => {setPopUp("login")}}>Log-in</MDBBtn>
                <MDBBtn onClick={() => {setPopUp("register")}}>Sign-up</MDBBtn>
            </div>
            
        )
    }
}

function renderPopUp(popUp, setPopUp, dispatchMyUser) {
    if (!popUp)
        return (null);

    if(popUp === "register")
    {
        return(
            <RegisterPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    else if ( popUp === "login")
    {
        return(
            <LoginPopUp dispatchMyUser={dispatchMyUser} setPopUp={setPopUp}/>
        )
    }
    else if (popUp === "reset")
    {
        return(
            <ResetPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    
}