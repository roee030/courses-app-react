  
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
    const [type, setType] = useState('')
    const renderPopUpObj ={
        showRegisterPopUp: showRegisterPopUp,
        user :user,
        setUser: setUser,
        showLoginPopUp: showLoginPopUp,
        setShowLoginPopUp: setShowLoginPopUp,
        showRessetPasswordPopUp: showRessetPasswordPopUp,
        setShowRessetPasswordPopUp: setShowRessetPasswordPopUp,
        setShowRessetPasswordCheckPopUp: setShowRessetPasswordCheckPopUp,
        showRessetPasswordCheckPopUp: showRessetPasswordCheckPopUp,
        type: type,
        setType: setType,
    }
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} onLoginClick={setShowLoginPopUp}
            onSignupClick={setShowRegisterPopUp} showRegisterPopUp={showRegisterPopUp}/>
            {renderPopUp(renderPopUpObj)}
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

function renderPopUp(obj) {
        
    if (obj.showLoginPopUp === true ) {
        return (
            <PopUp type={obj.type='login'} setUser={obj.setUser} setType={obj.setType}showLoginPopUp={obj.showLoginPopUp} setShowLoginPopUp={obj.setShowLoginPopUp}/>
        )
    }
    else if (obj.showRegisterPopUp === true ) {
        obj.type="register"
        return (
            <PopUp type={obj.type} setType={obj.setType} />
        )
    }
    else if(obj.type === "reset")
    {
        return (
            <PopUp type='reset' setType={obj.setType} />
        )
    }
    
}