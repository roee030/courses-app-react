  
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import './Header.css'
import CoursesGrid from './CoursesGrid';
import { MDBNavbar, MDBBtn } from "mdbreact";

// import Navbar from '../components/Navbar';
import Header from './Header';
import SearchBar from './SearchBar';
import Title from './Title';
import * as serverApi from '../helpers/server_api';
import UseSearchEffect from '../hooks/UseSearchEffect';
import RegisterPopUp from './RegisterPopUp';
import LoginPopUp from './LoginPopUp';
import ResetPopUp from './ResetPopUp';

export default function Home() {
    const [popUp, setPopUp] = useState(null);
    const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRessetPasswordCheckPopUp, setShowRessetPasswordCheckPopUp] = useState(false);
    const [showRessetPasswordPopUp, setShowRessetPasswordPopUp] = useState(false);
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState('');
    const [courses, isLoading] = UseSearchEffect('courses', query);
    const [type, setType] = useState('')
   
    return (
        <div>
        <MDBNavbar className="Navbar"  dark expand="md" style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}}>
        {addButtons(isLoggedIn,setPopUp)}   

       </MDBNavbar>
            {renderPopUp(popUp,setPopUp)}
        </div>
    );
}

function checkLoggedIn() {
    const isLoggedIn = serverApi.isLoggedIn();
}
function addButtons(isLoggedIn,setPopUpType) {
    if (isLoggedIn) {
        return (
            <div>My Account</div>
        )
    }

    return (
        <div>
            <MDBBtn onClick={() => {setPopUpType("login")}}>Log-in</MDBBtn>
            <MDBBtn onClick={() => {setPopUpType("register")}}>Sign-up</MDBBtn>
        </div>
        
    )
}

function test(onLoginClickFunc, isLoggedIn) {
    return () => {
        onLoginClickFunc(!isLoggedIn);
    }
}
function renderPopUp(popUp,setPopUp) {
    if (!popUp)
        return;

    if(popUp === "register")
    {
        return(
            <RegisterPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    else if ( popUp === "login")
    {
        return(
            <LoginPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    else if (popUp === "reset")
    {
        return(
            <ResetPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    
}