import React, { useState, useContext, useReducer } from 'react';
import { Link } from "react-router-dom";

export default function MainCourseLink({ mainCourseId }) {
    if (!mainCourseId)
        return (null);

    return (
        <Link to={`/courses/${mainCourseId}`}>Main Course</Link>
    )
}