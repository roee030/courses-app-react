import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from './courses/CourseCard';

function CoursesGrid(props) {
    const courses = props.courses || [];

    return (
        <div id="container">
            <div id="grid-row">
                {
                    courses.map((item, i) => {
                        return <Card key={'grid-item' + i} name={item.name} description={item.description} courseId={item.courseId}/>
                    })
                }
            </div>
        </div>
    )
}

export default CoursesGrid;