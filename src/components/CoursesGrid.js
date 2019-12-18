import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import CourseCard from './courses/CourseCard';

function CoursesGrid(props) {
    const courses = props.courses || [];

    return (
        <div id="container">
            <div id="grid-row">
                {
                    courses.map((item, i) => {
                        return <CourseCard key={'grid-item' + i} name={item.name} description={item.description} courseId={item.courseId}/>
                    })
                }
            </div>
        </div>
    )
}

export default CoursesGrid;