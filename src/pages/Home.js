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
import useSearchEffect from '../hooks/UseSearchEffect';

export default function Home(props) {
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
            <Header isLoggedIn={isLoggedIn} onLoginClick={setShowLoginPopUp}/>
            {renderPopUp(showLoginPopUp)}
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

function renderPopUp(showPopUp = false) {
    console.log('asasasasasas');
    console.log(showPopUp);
    
    if (!showPopUp)
        return;

    return (
        <PopUp text='Close Me' />
    )
}