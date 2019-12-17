import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBIcon } from 'mdbreact';
import Title from '../components/Title';
import './Register.css'
import { Link } from "react-router-dom";
import isFormValidation from '../helpers/formValidation';
class FormPage extends React.Component  {
state = {
  Full_name: "",
  idNumber: "",
  confirm_idNumber: "",
  personalNumber: "",
  confirm_personalNumber: "",
  hogerNumber: "",
  confirm_hogerNumber: "",
  birthDate: "",
  password: "",
  confirm_password: "",
};
changeHandler = event => {
  this.setState({ [event.target.name]: event.target.value });
};
test = () =>
{
  var d = document.getElementById("confirm_password");
  d.className += " is-invalid ";

}
render() {
  return (
    <MDBContainer className="register-component">
      <MDBRow>
        <MDBCol md="6">
          <form className="register-form">
          <Title title="Register"/>
            <div className="grey-text ">
              <MDBInput
                label="Your name"
                name="Full_name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className="is-invalid"
                required
                onChange={this.changeHandler}
              />
              
              <MDBInput
                label="Your id number"
                name="idNumber"
                icon="envelope"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}
              />
              <MDBInput
                label="Confirm your id number"
                name="confirm_idNumber"
                icon="exclamation-triangle"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}
              />
              <MDBInput
                label="Your personal number"
                name="personalNumber"
                icon="envelope"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}

              />
              <MDBInput
                label="Confirm your personal number"
                name="confirm_personalNumber"
                icon="exclamation-triangle"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}

              />
              <MDBInput
                label="Your Hoger number"
                name="hogerNumber"
                icon="envelope"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}

              />
              <MDBInput
                label="Confirm your Hoger number"
                name="confirm_hogerNumber"
                icon="exclamation-triangle"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}
              />
              <MDBInput
                label="Phone number"
                name="phoneNumber"
                icon="exclamation-triangle"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                required
                onChange={this.changeHandler}
              />
              <MDBInput
                label="BirthDate"
                name="birthDate"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                
              />
              <MDBInput
                label="Your password"
                name="password"
                icon="lock"
                group
                type="password"
                validate
                required
                onChange={this.changeHandler}

              />
              <MDBInput
                id="confirm_password"
                label="Confirm your password"
                name="confirm_password"
                icon="lock"
                group
                type="password"
                validate
                required
                onChange={this.changeHandler}
              />
            </div>
            <div className="text-center">
              <MDBBtn className="register-btn"
              onClick={()=>this.test()
              }>Register</MDBBtn>
            </div>
            <div className="text-center">
              </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  
  )}
}
export default FormPage;