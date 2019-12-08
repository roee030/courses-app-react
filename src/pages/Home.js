  
import React from 'react'
import { Link } from "react-router-dom";
import './Home.css'
export default function Home() {

    return (
        <>
            
            Hello from Home page
            <div className="bg"></div>
            <Link to="/courses">
                    Our Courses
            </Link>
            </>
    );
}
