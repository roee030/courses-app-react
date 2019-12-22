import React, { useState, useContext, useReducer } from 'react';
import CoursesGrid from '../../../components/CoursesGrid';

export default function SubCourses({ courses = [] }) {
    if (courses.length === 0)
        return (null);

    return (
        <div id='subCoursesContainer'>
            <CoursesGrid courses={courses}/>
        </div>
    )
}