  
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import './Home.css'
import CoursesGrid from '../components/CoursesGrid';
import PopUp from '../components/PopUp';
// import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import * as serverApi from '../helpers/server_api';
import useSearchEffect from '../hooks/use_search_effect';
import RegisterPopUp from '../components/RegisterPopUp';
import LoginPopUp from '../components/LoginPopUp';

export default function Home() {
    const [popUp, setPopUp] = useState(null);
    const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRessetPasswordCheckPopUp, setShowRessetPasswordCheckPopUp] = useState(false);
    const [showRessetPasswordPopUp, setShowRessetPasswordPopUp] = useState(false);
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState('');
    const [courses, isLoading] = useSearchEffect('courses', query);
    const [type, setType] = useState('')
   
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} onBtnClick={PopUp}
            setPopUpType={(type) => {setPopUp(type)}}/>
            {renderPopUp(popUp,setPopUp)}
            <div className="bg"></div>
                <Title title={"Search for Course"}/>
                <SearchBar onChange={searchString => setQuery(searchString)}/>
            <div>
                <CoursesGrid courses={courses}/>
            </div>
        </div>
    );
}

function checkLoggedIn() {
    const isLoggedIn = serverApi.isLoggedIn();
}

function renderPopUp(popUp,setPopUp) {
    if (!popUp)
        return;

    if(popUp === "register")
    {
        return(
            <RegisterPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    else if ( popUp === "login")
    {
        return(
            <LoginPopUp popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    
}