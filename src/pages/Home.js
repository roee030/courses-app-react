  
import React from 'react'
import { Link } from "react-router-dom";
import './Home.css'
import Courses from './Courses';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import axios from 'axios';
export default function Home() {
    const reqBody = {
    name:"Roee",
    idNumber:"132456789",
    idNumberConf:"132456789",
    personalNumber:"1234567",
    personalNumberConf:"1234567",
    hogerNumber:"12345678",
    hogerNumberConf:"12345678",
    phoneNumber:"0548336350",
    birthDate:"06/12/1990",
    password:"1132456",
    passwordConf:"1132456"};

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    const reqFunc = async () => {
        console.log("ddd");
        axios.get('localhost:3010/accounts/mine', reqBody, config).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        })
        
        
    }
    
          return (
        <>
            <div className="bg"></div>
            <Title title={"Search for Course"}/>
            <SearchBar/>
            {reqFunc()} 
            <Courses/>
            </>
    );
}
