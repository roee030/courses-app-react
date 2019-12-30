  
import React, { useState, useReducer, useContext } from 'react'
import { Link } from "react-router-dom";
import './Header.css'
import { MDBNavbar, MDBBtn } from "mdbreact";

import RegisterPopUp from './RegisterPopUp';
import LoginPopUp from './LoginPopUp';
import ResetPopUp from './ResetPopUp';
import actions from '../store/actions';
import * as serverApi from '../helpers/server_api';

export default function Header({ myUser, dispatchMyUser }) {
    const localStorageUserString = localStorage.getItem('myUser');

    const localStorageUser = localStorageUserString ? JSON.parse(localStorageUserString) : {};

    if (localStorageUser && localStorageUser._id && !myUser._id)
        dispatchMyUser(actions.users.addMyUser(localStorageUser));
    
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
                    <MDBBtn onClick={() => logout(dispatchMyUser)}>Log-out</MDBBtn>
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

function logout(dispatchMyUser) {
    dispatchMyUser(actions.users.addMyUser({}));
    serverApi.logOut();
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