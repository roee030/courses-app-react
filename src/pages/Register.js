import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBIcon } from 'mdbreact';
import Title from '../components/Title';

import './Register.css'
import { Link } from "react-router-dom";

const FormPage = () => {
  return (
    <MDBContainer className="register-component">
      <MDBRow>
        <MDBCol md="6">
          <form className="register-form">
          <Title title="Register"/>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              
              />
              
              <MDBInput
                label="Your id number"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Confirm your id number"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your personal number"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"

              />
              <MDBInput
                label="Confirm your personal number"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"

              />
              <MDBInput
                label="Your Hoger number"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"

              />
              <MDBInput
                label="Confirm your Hoger number"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"

              />
              <MDBInput
                label="Phone number"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"

              />
              <MDBInput
                label="BirthDate"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                validate

              />
              <MDBInput
                label="Confirm your password"
                icon="lock"
                group
                type="password"
                validate

              />
            </div>
            <div className="text-center">
              <MDBBtn className="register-btn"
              onClick={()=>console.log(this.userRegistration)}>Register</MDBBtn>
            </div>
            <div className="text-center">
              </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;    