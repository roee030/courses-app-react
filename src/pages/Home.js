  
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

export default function Home() {
    const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRessetPasswordCheckPopUp, setShowRessetPasswordCheckPopUp] = useState(false);
    const [showRessetPasswordPopUp, setShowRessetPasswordPopUp] = useState(false);
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState('');
    const [courses, isLoading] = useSearchEffect('courses', query);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} onLoginClick={setShowLoginPopUp}
            onSignupClick={setShowRegisterPopUp} showRegisterPopUp={showRegisterPopUp}/>
            {renderPopUp(user,setUser,showLoginPopUp,showRegisterPopUp)}
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

function renderPopUp(user, setUser, showLoginPopUp, showRegisterPopUp) {
    if (showLoginPopUp === true ) {
        return (
            <PopUp type='login' setUser={setUser}/>
        )
    }
    else if (showRegisterPopUp === true ) {
        return (
            <PopUp type='register' />
        )
    }
    
}