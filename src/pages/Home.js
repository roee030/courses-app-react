  
import React from 'react'
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div>
            Hello from Home page
            <Link to="/courses">
                    Our Courses
                </Link>
        </div>
    )
}
