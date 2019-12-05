  
import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            Hello from Home page
            <Link to="/courses">
                    Our Courses
            </Link>
            </>
    );
}
