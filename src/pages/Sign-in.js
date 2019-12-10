import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";
import Title from '../components/Title';
import './Sign-in.css'
const FormPage = () => {
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
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn className="login-btn">Login</MDBBtn>
              </div>
              <div className="text-center">
              <Link  to="/register" >
                Create an account
            </Link>
              </div>
              
            
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;