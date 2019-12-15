import React, { useState } from 'react'
import { MDBNavbar, MDBBtn } from "mdbreact";

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    const onLoginClickFunc = props.onLoginClick;
    const onSignupClickFunc = props.onSignupClick;
    const onMyAccountClickFunc = props.onMyAccountClick;

    // return (
    //     <div key='header'>
    //         <div key='headerIcon' />
    //         <div key='login' />
    //         <div key='signup' />
    //     </div>
    // )

    return (
        <MDBNavbar className="Navbar"  dark expand="md" style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}}>
         {addButtons(isLoggedIn, onLoginClickFunc)}   

        </MDBNavbar>
    )
}

function addButtons(isLoggedIn, onLoginClickFunc) {
    if (isLoggedIn) {
        return (
            <div>My Account</div>
        )
    }

    return (
        <div>
            <MDBBtn onClick={() => { onLoginClickFunc(!isLoggedIn)}}>Log-in</MDBBtn>
            <MDBBtn>/Sign-up</MDBBtn>
        </div>
        
    )
}

function test(onLoginClickFunc, isLoggedIn) {
    return () => {
        onLoginClickFunc(!isLoggedIn);
    }
}

export default Header;