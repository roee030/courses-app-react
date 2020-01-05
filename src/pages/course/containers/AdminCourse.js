import React from 'react';
import MembersGrid from '../../user/presentials/MembersGrid';
import ReviewsArea from './ReviewsArea';
import DatesOrSubCourses from './DatesOrSubCourses';
import MainCourseLink from '../presentials/MainCourseLink';
import CoreFileLink from '../presentials/CoreFileLink';
import PostsArea from '../presentials/PostsArea';

export default function AdminCourse({ course,
                                            subCourses = [],
                                            admins = [],
                                            participates = [],
                                            pendingRequests = [],
                                            posts = [],
                                            reviews = [],
                                            onRemoveMemberClick,
                                            onRemovePendingClick,
                                            onApprovedPendingRequestClick,
                                            onAddPostClick,
                                            onAddReviewClick }) {
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;
    
    const membersGrid = [{
        title: 'admins',
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: admins,
    }, {
        title: 'participates',
        isRemoveEnabled: true,
        isAddEnabled: false,
        list: participates,
        removeFunc: onRemoveMemberClick
    }, {
        title: 'pending requests',
        isRemoveEnabled: true,
        isAddEnabled: true,
        list: pendingRequests,
        removeFunc: onRemovePendingClick,
        addFunc: onApprovedPendingRequestClick
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
                        <CoreFileLink coreFileLink={course.coreFile.link} />
                    </div>
                    <div>
                        <MainCourseLink mainCourseId={course.mainCourseId} />
                        <DatesOrSubCourses subCourses={subCourses} fromDate={fromDate} toDate={toDate} />
                    </div>
                    <div>
                        <PostsArea isAdmin={true} posts={posts} onAddPostClick={onAddPostClick} />
                    </div>
                    <div>
                        <ReviewsArea isAdmin={true} isParticipate={false} isSuperUser={false} reviews={reviews} onAddReviewClick={onAddReviewClick} />
                    </div>
                </div>
                <div>
                    <MembersGrid members={membersGrid}/>
                </div>
            </div>
        </div>
    )
}