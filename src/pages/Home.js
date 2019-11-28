  
import React from 'react'
import { Link } from "react-router-dom";

import React from 'react'

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
