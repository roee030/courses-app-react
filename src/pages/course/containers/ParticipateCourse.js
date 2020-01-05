import React from 'react';
import MembersGrid from '../../user/presentials/MembersGrid';
import MainCourseLink from '../presentials/MainCourseLink';
import DatesOrSubCourses from './DatesOrSubCourses';
import PostsArea from '../presentials/PostsArea';
import ReviewsArea from './ReviewsArea';

export default function ParticipateCourse({ course, 
                                            admins = [],
                                            participates = [],
                                            subCourses = [],
                                            posts = [],
                                            onAddPostClick,
                                            onAddReviewClick }) {
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;
    
    const membersGrid = [{
        title: 'admins',
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: admins
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
                        {course.name}
                    </div>
                    <div id='description'>
                        {course.description}
                    </div>
                    <div>
                        <MainCourseLink mainCourseId={course.mainCourseId} />
                        <DatesOrSubCourses subCourses={subCourses} fromDate={fromDate} toDate={toDate} />
                    </div>
                    <div>
                        <PostsArea isAdmin={false} posts={posts} onAddPostClick={onAddPostClick} />
                    </div>
                    <div>
                        <ReviewsArea isAdmin={false} isParticipate={true} isSuperUser={false} reviews={[]} onAddReviewClick={onAddReviewClick} />
                    </div>
                </div>
                <div>
                    <MembersGrid members={membersGrid}/>
                </div>
            </div>
        </div>
    )
}