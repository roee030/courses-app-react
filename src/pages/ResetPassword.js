import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Title from '../components/Title';

export default function ResetPassword() {
    return (
        <div>
        <MDBContainer className="register-component">
        <MDBRow>
          <MDBCol md="6">
            <form className="register-form">
            <Title title="Reset Your password"/>
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
                <div className="text-center">
                    <MDBBtn className="register-btn">Reset</MDBBtn>
                
                </div>
             </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        </div>
    )
}
