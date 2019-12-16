import React, { useState } from 'react'
import { MDBNavbar, MDBBtn } from "mdbreact";

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    const onBtnClick = props.popUp;
    const setPopUpType = props.setPopUpType;


    // return (
    //     <div key='header'>
    //         <div key='headerIcon' />
    //         <div key='login' />
    //         <div key='signup' />
    //     </div>
    // )

    return (
        <MDBNavbar className="Navbar"  dark expand="md" style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}}>
         {addButtons(isLoggedIn,setPopUpType)}   

        </MDBNavbar>
    )
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

export default Header;