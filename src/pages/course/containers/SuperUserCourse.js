import React from 'react';
import Button from '@material-ui/core/Button';
import MembersGrid from '../../../components/MembersGrid';
import CoreFileLink from '../presentials/CoreFileLink';
import MainCourseLink from '../presentials/MainCourseLink';
import DatesOrSubCourses from './DatesOrSubCourses';
import ReviewsArea from './ReviewsArea';

export default function SuperUserCourse({ course,
                                admins = [],
                                participates = [],
                                subCourses =[],
                                reviews = [],
                                onRemoveAdminClick,
                                onAddAdminClick,
                                onAddReviewClick }) {
    const courseName = course.name;
    const courseDescription = course.description;
    const coreFileLink = course.coreFile.link;
    const mainCourseId = course.mainCourseId;
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;
    
    const membersGrid = [{
        title: 'admins',
        isRemoveEnabled: true,
        isAddEnabled: false,
        list: admins,
        removeFunc: onRemoveAdminClick
    }, {
        title: 'participates',
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: participates
    }];

    return (
        <div id='mainContainer'>
            <div id='contentContainer'>
                <div id='courseDataContainer'>
                    <div id='title'>
                        {courseName}
                    </div>
                    <div id='description'>
                        {courseDescription}
                    </div>
                    <div>
                        <CoreFileLink coreFileLink={coreFileLink} />
                    </div>
                    <div>
                        <MainCourseLink mainCourseId={mainCourseId} />
                        <DatesOrSubCourses subCourses={subCourses} fromDate={fromDate} toDate={toDate} />
                    </div>
                    <div>
                        <ReviewsArea isAdmin={false} isParticipate={false} isSuperUser={true} reviews={reviews} onAddReviewClick={onAddReviewClick} />
                    </div>
                </div>
                <div>
                    <Button onClick={onAddAdminClick}>Add Admin</Button>
                    <MembersGrid members={membersGrid}/>
                </div>
            </div>
        </div>
    )
}