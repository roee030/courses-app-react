import React, { useContext } from 'react';
import MainCourseLink from '../presentials/MainCourseLink';
import DatesOrSubCourses from './DatesOrSubCourses';
import AppContext from '../../../helpers/AppContext';

export default function LoggedOutCourse({ courseId, subCourses = [] }) {
    const context = useContext(AppContext);
    const course = context.courses[courseId];
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;

    return (    
        <div id='mainContainer'>
            <div id='contentContainer'>
                <div id='courseDataContainer'>
                    <div id='title'>
                        {course.name}
                    </div>
                    <div id='description'>
                        {course.description}
                    </div>
                    <div>
                        <MainCourseLink mainCourseId={course.mainCourseId} />
                        <DatesOrSubCourses subCourses={subCourses} fromDate={fromDate} toDate={toDate} />
                    </div>
                </div>
            </div>
        </div>
    )
}