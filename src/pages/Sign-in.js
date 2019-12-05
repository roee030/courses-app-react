import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";
import './Sign-in.css'
const FormPage = () => {
  return (
    <div >
      <MDBRow>
        <MDBCol md="6">
          <form className="login-form">
            <p className="h4 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your id"
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
    </div>
  );
};

export default FormPage;