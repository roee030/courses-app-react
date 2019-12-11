  
import React from 'react'
import { Link } from "react-router-dom";
import './Home.css'
import Courses from './Courses';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import axios from 'axios';
export default function Home() {
    
    
          return (
        <div>
            <div className="bg"></div>
            <Title title={"Search for Course"}/>
            <SearchBar/>
            <Courses/>
        </div>
    );
}
