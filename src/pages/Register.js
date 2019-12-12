import React , { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Title from '../components/Title';
import Alert from '../components/Alert'
import './Register.css'
import { Link } from "react-router-dom";

export default class Register extends Component {
  state={
      fullName:"",
      idNumber:"",
      confirm_idNumber:"",
      personalNumber:"",
      confirm_personalNumber:"",
      hogerNumber:"",
      confirm_hogerNumber:"",
      phoneNumber:"",
      confirm_phoneNumber:"",
      password:"",
      confirm_password:"",
      errorMsg:[]
  }
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  ///////////////
  //VALIDATIONS//
  ///////////////
  valid_hogerNumber = (hn) => {
    return(hn.length == 8 ) ? true : false;
  }
  valid_password = (pw) => {
    return(pw.length >=6 ) ? true : false;
  }
  valid_phoneNumber = (pn) => {
    return(pn.length == 10 ) ? true : false;
  }
  valid_personalNumber = (pn) => {
    return(pn.length == 7) ? true : false;
  }
  valid_idNumber = (id) => {
    return(id.length == 9) ? true : false;
  }
  valid_fullName = (fn) => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!regName.test(fn)){
        //alert('Please enter your full name (first & last name).');
        return false;
    }else{
        alert('Valid name given.');
        return true;
    }
  }

  onsubmit = event => {
    const valid_password = ((this.state.password == this.state.confirm_password) && this.valid_password(this.state.password))
    const valid_phoneNumber = ((this.state.phoneNumber == this.state.confirm_phoneNumber) && this.valid_phoneNumber(this.state.phoneNumber))
    const valid_personalNumber = ((this.state.personalNumber == this.state.confirm_personalNumber) && this.valid_personalNumber(this.state.personalNumber))
    const valid_idNumber = ((this.state.idNumber == this.state.confirm_idNumber) && this.valid_idNumber(this.state.idNumber))
    //const valid_fullName = ( this.valid_fullName(this.state.fullName))
    const valid_hogerNumber = ((this.state.hogerNumber == this.state.confirm_hogerNumber) && this.valid_hogerNumber(this.state.hogerNumber))
    let errorMsg = []
    if(!valid_password) errorMsg.push("Password need to have at least 6 character and both password need to match. "); 
    if(!valid_phoneNumber) errorMsg.push("Phone number is invalid.");
    if(!valid_personalNumber) errorMsg.push("Personal number is invalid.");
    if(!valid_idNumber) errorMsg.push("Id number is invalid.");
    //if(!valid_fullName) errorMsg.push("Your name is invalid.");
    if(!valid_hogerNumber) errorMsg.push("Hoger number is invalid.");

    if(errorMsg.length == 0)
    {
      alert("all good")
    }
    else{
      this.setState({errorMsg})
    }



  }
  render() {
     return (
      <div>
      
      <MDBContainer className="register-component">
      <MDBRow>
        <MDBCol md="6">
          <form className="register-form">
          <Title title="Register"/>
      
          <div id="errorMsg"> 
            
            
          </div>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                name="fullName"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
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
                onChange={this.changeHandler}
              />

              <MDBInput
                label="Your password"
                name="password"
                icon="lock"
                group
                type="password"
                validate
                onChange={this.changeHandler}
              />
              <MDBInput
                label="Confirm your password"
                name="confirm_password"
                icon="lock"
                group
                type="password"
                validate
                onChange={this.changeHandler}
              />
            </div>
            <div className="text-center">
              <MDBBtn className="register-btn" onClick={this.onsubmit}>Register</MDBBtn>
            </div>
            
            <div className="text-center"> 
              <Link  to="/log-in" >
                I have a user, let me Sign-in
            </Link>
              </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      </div>
    )
  }
}







