import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBIcon,MDBAlert  } from 'mdbreact';
import Title from './Title';
import './Register.css'
import { Link } from "react-router-dom";
import * as Server_API from '../helpers/server_api';
export default function FormPage()  {
const [Full_name,setFull_name] = useState("");
const [idNumber,setIdNumber] = useState("");
const [confirm_idNumber,setConfirm_idNumber] = useState("");
const [personalNumber,setPersonalNumber] = useState("");
const [confirm_personalNumber,setConfirm_personalNumber] = useState("");
const [hogerNumber,setHogerNumber] = useState("");
const [confirm_hogerNumber,setConfirm_hogerNumber] = useState("");
const [birthDate,setBirthDate] = useState("");
const [phoneNumber,setPhoneNumber] = useState("");
const [password,setPassword] = useState("");
const [confirm_password,setConfirm_password] = useState("");
var registerErr = "";
function setRegisterErr (data) 
{
    registerErr= data;
}
function testFields ()
{
    var body = {
        name:Full_name,
        idNumber: idNumber,
        idNumberConf: confirm_idNumber,
        personalNumber: personalNumber,
        personalNumberConf: confirm_personalNumber,
        hogerNumber: hogerNumber,
        hogerNumberConf: confirm_hogerNumber,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        password: password,
        passwordConf: confirm_password
    }
    var form = document.getElementById("form_validation");
    var Full_name_field = document.getElementById("Full_name");
    var idNumber_field = document.getElementById("idNumber");
    var confirm_idNumber_field = document.getElementById("confirm_idNumber");
    var personalNumber_field = document.getElementById("personalNumber");
    var confirm_personalNumber_field = document.getElementById("confirm_personalNumber");
    var hogerNumber_field = document.getElementById("hogerNumber");
    var confirm_hogerNumber_field = document.getElementById("confirm_hogerNumber");
    var birthDate_field = document.getElementById("birthDate");
    var phoneNumber_field = document.getElementById("phoneNumber");
    var password_field = document.getElementById("password");
    var confirm_password_field = document.getElementById("confirm_password");
    var registerError_field = document.getElementById("registerErr");
    registerError_field.innerHTML = ""
    setRegisterErr("");
    //Name validation 
    if(Full_name == "" )
    {
        Full_name_field.className += " is-invalid "
        setRegisterErr(registerErr + "<br />Enter your name ")
    }
    else
    {
        Full_name_field.className += " is-valid "
    }
    //Id validation
    if(idNumber == confirm_idNumber)
    {
        if(idNumber.length == 9)
        {
            idNumber_field.className+=" is-valid "
            confirm_idNumber_field.className+="  is-valid "
        }
        else
        {
            idNumber_field.className+=" is-invalid "
            confirm_idNumber_field.className+="  is-invalid "
            setRegisterErr(registerErr + "<br />ID number need to be 9 numbers! ");
        }
    }
    else
    {
        setRegisterErr(registerErr + "<br />ID number not match! ");
        idNumber_field.className+=" is-invalid "
        confirm_idNumber_field.className += "  is-invalid "
    }
    //personalNumber validation
    if(personalNumber == confirm_personalNumber)
    {
        if(personalNumber.length == 7)
        {
            personalNumber_field.className+= " is-valid "
            confirm_personalNumber_field.className+= " is-valid "
        }
        else
        {
            setRegisterErr(registerErr + "<br />Personal number need to be 7 numbers! ")
            personalNumber_field.className+= " is-invalid "
            confirm_personalNumber_field.className+= " is-invalid "
        }
    }
    else{
        setRegisterErr(registerErr + "<br />Personal number not match! ")
        personalNumber_field.className+= " is-invalid "
        confirm_personalNumber_field.className+= " is-invalid "
    }
    //hogerNumber validation
    if(hogerNumber == confirm_hogerNumber)
    {
        if(hogerNumber.length == 8)
        {
            hogerNumber_field.className+= " is-valid "
            confirm_hogerNumber_field.className+= " is-valid "
        }
        else
        {
            hogerNumber_field.className+= " is-invalid "
            confirm_hogerNumber_field.className+= " is-invalid "
            setRegisterErr(registerErr +"<br />Hoger number need to be 8 numbers! ");
        }
    }
    else
    {
        setRegisterErr(registerErr +"<br />Hoger number not match! ")
        hogerNumber_field.className+= " is-invalid "
        confirm_hogerNumber_field.className+= " is-invalid "
    }
    //phonenumber validation
    if(phoneNumber.length != 10)
    {
        setRegisterErr(registerErr +"<br />Phone number is not valid! ");
        phoneNumber_field.className += " is-invalid "
    }
    else
    {
        phoneNumber_field.className += " is-valid " 
    }
    //password validation
    if(password == confirm_password)
    {
        if(password.length > 6)
        {
            password_field.className += " is-valid "
            confirm_password_field.className +=  " is-valid "
        }
        else
        {
            password_field.className += " is-invalid "
            confirm_password_field.className +=  " is-invalid "
            setRegisterErr(registerErr + " <br />Your password need to be more than 6 character! ");
        }
    }
    else
    {
        setRegisterErr(registerErr + "<br />Password not match! ");
        password_field.className += " is-invalid "
        confirm_password_field.className +=  " is-invalid "
    }

    
    if(registerErr != "")
    {
        
        registerError_field.innerHTML += registerErr;
    }
    else
    {
        form.className += " was-validated "
        Server_API.post("/users/signup", body ,(data)=>console.log(data))
    }
    
}

  return (
    <MDBContainer className="register-component">
      <MDBRow>
        <MDBCol md="6">
          <form className="register-form" id="form_validation">
          <Title title="Register"/>
            <div className="grey-text ">
              <MDBInput
                label="Your name"
                name="Full_name"
                id="Full_name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className=""
                required
                onChange={e => setFull_name(e.target.value)}
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
                onChange={e => setIdNumber(e.target.value)}
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
                onChange={e => setConfirm_idNumber(e.target.value)}
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
                onChange={e => setPersonalNumber(e.target.value)}
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
                onChange={e => setConfirm_personalNumber(e.target.value)}

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
                onChange={e => setHogerNumber(e.target.value)}

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
                onChange={e => setConfirm_hogerNumber(e.target.value)}
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
                onChange={e => setPhoneNumber(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}

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
                onChange={e => setConfirm_password(e.target.value)}
                />
            </div>
            <div className="text-center">
              <MDBBtn className="register-btn"
              onClick={()=>testFields()
              
              }>Register</MDBBtn>
            </div>
            <div className="text-center" id="registerErr">
              </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  
  )}
