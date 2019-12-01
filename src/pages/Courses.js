import React from 'react'
import { Link } from "react-router-dom";
import CourseShow from '../components/courses/CourseShow';

export default function Courses() {
    return (
        <div>
            Hello from Courses page
            <Link to="/">
                    Home page
            </Link>
            <CourseShow/>
        </div>
    )
}
