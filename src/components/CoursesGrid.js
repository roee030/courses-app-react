import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import CourseCard from './courses/CourseCard';

function CoursesGrid(props) {
    const courses = props.courses || [];

    return (
        // <div>
            <Grid item xs={12} >
                <Grid container justify="center" spacing={24}>
                   {
                        courses.map((course, i) => {
                            return (
                                <Grid key={`course-${i}`} item>
                                    <CourseCard key={'grid-item' + i} name={course.name} description={course.description} courseId={course._id}/>
                                </Grid>
                        )})
                    }
                </Grid>
            </Grid>
        // </div>
    )
}

export default CoursesGrid;


// {[0, 1, 2].map(value => (
//     <Grid key={value} item>
// <Paper className={classes.paper} />
// </Grid>
// ))}