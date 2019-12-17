import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBIcon } from 'mdbreact';
import Title from '../components/Title';
import './Register.css'
import { Link } from "react-router-dom";
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
  registerErr: ""
};
changeHandler = event => {
  this.setState({ [event.target.name]: event.target.value });
};
testFields = () =>
{
    var Full_name_field = document.getElementById("Full_name");
    var idNumber_field = document.getElementById("idNumber");
    var confirm_idNumber_field = document.getElementById("confirm_idNumber");
    var personalNumber_field = document.getElementById("personalNumber");
    var confirm_personalNumber_field = document.getElementById("confirm_personalNumber");
    var hogerNumber_field = document.getElementById("hogerNumber");
    var confirm_hogerNumber_field = document.getElementById("confirm_hogerNumber");
    var birthDate_field = document.getElementById("birthDate");
    var password_field = document.getElementById("password");
    var confirm_password_field = document.getElementById("confirm_password");
    var registerError_field = document.getElementById("registerErr");
    this.setState({
        registerErr: ""
    })
    registerError_field.innerHTML = ""
    //Id validation
    if(this.state.idNumber == this.state.confirm_idNumber)
    {
        if(this.state.idNumber.length === 9)
        {
            idNumber_field.className+=" is-valid "
            confirm_idNumber_field.className+="  is-valid "
        }
        else{
            idNumber_field.className+=" is-invalid "
            confirm_idNumber_field.className+="  is-invalid "
            this.state.registerErr+="<br />ID number need to be 9 numbers! ";
        }
    }
    else
    {
        this.state.registerErr+="<br />ID number not match! "
        idNumber_field.className+=" is-invalid "
        confirm_idNumber_field.className += "  is-invalid "
    }
    //personalNumber validation
    if(this.state.personalNumber === this.state.confirm_personalNumber)
    {
        if(this.state.personalNumber.length === 7)
        {
            personalNumber_field.className+= " is-valid "
            confirm_personalNumber_field.className+= " is-valid "
        }
        else
        {
            this.state.registerErr+="<br />Personal number need to be 7 numbers! ";
            personalNumber_field.className+= " is-invalid "
        }
    }
    else{
        this.state.registerErr+="<br />Personal number not match! "
        personalNumber_field.className+= " is-invalid "
        confirm_personalNumber_field.className+= " is-invalid "
    }
    //hogerNumber validation
    if(this.state.hogerNumber === this.state.confirm_hogerNumber)
    {
        if(this.state.hogerNumber.length === 8)
        {
            hogerNumber_field.className+= " is-valid "
            confirm_hogerNumber_field.className+= " is-valid "
        }
        else
        {
            hogerNumber_field.className+= " is-invalid "
            this.state.registerErr+="<br />Hoger number need to be 8 numbers! ";
        }
    }
    else
    {
        this.state.registerErr+="<br />Hoger number not match! "
        hogerNumber_field.className+= " is-invalid "
        confirm_hogerNumber_field.className+= " is-invalid "
    }
    //password validation
    if(this.state.password === this.state.confirm_password)
    {
        if(this.state.password.length > 6)
        {
            password_field.className += " is-valid "
            confirm_password_field +=  " is-valid "
        }
        else
        {
            password_field.className += " is-invalid "
            this.state.registerErr+=" <br />Your password need to be more than 6 character! ";
        }
    }
    else
    {
        this.state.registerErr+="<br />Password not match! "
        password_field.className += " is-invalid "
        confirm_password_field +=  " is-invalid "
    }
    if(this.state.registerErr != "")
    {
        registerError_field.innerHTML += this.state.registerErr;
    }
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
                id="Full_name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className=""
                required
                onChange={this.changeHandler}
              />
              
              <MDBInput
                label="Your id number"
                name="idNumber"
                id="idNumber"
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
                id="confirm_idNumber"
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
                id="personalNumber"
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
                id="confirm_personalNumber"
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
                id="hogerNumber"
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
                id="confirm_hogerNumber"
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
                id="phoneNumber"
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
                id="birthDate"
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
                id="password"
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
                id="confirm_password"
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
              onClick={()=>this.testFields()
              }>Register</MDBBtn>
            </div>
            <div className="text-center" id="registerErr">
              </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  
  )}
}
export default FormPage;