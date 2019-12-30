import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Title from './Title';
import './Sign-in.css'
import * as serverApi from '../helpers/server_api';
import actions from '../store/actions';

export default function LoginForm({ dispatchMyUser, setPopUp }) {
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);
    let personalNumber = '';
    let password = '';

    return (
        <MDBContainer className="sign-in-component">
            <MDBRow>
                <MDBCol md="6">
                    <form className="login-form">
                        <Title title="Sign in"/>
                        <div className="grey-text">
                            <MDBInput
                                label="Type your personal number"
                                icon="id-card"
                                group
                                validate
                                error="wrong"
                                success="right"
                                onChange={e => { personalNumber = e.target.value }}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                onChange={e => { password = e.target.value }}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn disabled={!isButtonEnabled} onClick={getUser} className="login-btn">Login</MDBBtn>
                        </div>
                        <div className="text-center">
             
                        </div>
                        <div className="text-center">
              
                        </div>
            
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );

    function getUser() {
        setIsButtonEnabled(false);
        serverApi.put('users/login', { personalNumber: personalNumber, password: password }, res => {
            const data = res ? res.data : undefined;
            
            if (data && data.user) {
                localStorage.setItem('myUser', JSON.stringify(data.user));
                
                dispatchMyUser(actions.users.addMyUser(data.user));
                setPopUp(null);
            }
        });
    }
};