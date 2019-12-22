import React from 'react';
import SubCourses from '../presentials/SubCourses';
import Dates from '../presentials/Dates';

export default function DatesOrSubCourses({ subCourses, fromDate, toDate }) {
    if (subCourses && subCourses.length > 0) {
        return (
            <SubCourses courses={subCourses} />
        )
    }
    
    return (
        <Dates fromDate={fromDate} toDate={toDate} />
    )
}