import React, { useContext } from 'react';
import AppContext from '../../../store/AppContext';
import MembersGrid from '../../../components/MembersGrid';
import ReviewsArea from './ReviewsArea';
import DatesOrSubCourses from './DatesOrSubCourses';
import MainCourseLink from '../presentials/MainCourseLink';
import CoreFileLink from '../presentials/CoreFileLink';
import PostsArea from '../presentials/PostsArea';

export default function AdminCourse({ courseId,
                                            subCourses = [],
                                            admins = [],
                                            participates = [],
                                            pendingRequests = [],
                                            posts = [],
                                            reviews = [],
                                            onMemberClick,
                                            onRemoveMemberClick,
                                            onRemovePendingClick,
                                            onApprovedPendingRequestClick,
                                            onAddPostClick,
                                            onAddReviewClick }) {
    const context = useContext(AppContext);
    const course = context.courses[courseId];
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;
    
    const membersGrid = [{
        title: 'admins',
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: admins,
        memberFunc: onMemberClick
    }, {
        title: 'participates',
        isRemoveEnabled: true,
        isAddEnabled: false,
        list: participates,
        memberFunc: onMemberClick,
        removeFunc: onRemoveMemberClick
    }, {
        title: 'pending requests',
        isRemoveEnabled: true,
        isAddEnabled: true,
        list: pendingRequests,
        memberFunc: onMemberClick,
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