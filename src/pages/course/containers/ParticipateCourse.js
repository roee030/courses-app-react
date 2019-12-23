import React, { useContext } from 'react';
import AppContext from '../../../store/AppContext';
import MembersGrid from '../../../components/MembersGrid';
import MainCourseLink from '../presentials/MainCourseLink';
import DatesOrSubCourses from './DatesOrSubCourses';
import PostsArea from '../presentials/PostsArea';
import ReviewsArea from './ReviewsArea';

export default function ParticipateCourse({ courseId, admins = [],
                                            participates = [],
                                            subCourses = [],
                                            posts = [],
                                            onMemberClick,
                                            onRemoveMemberClick,
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
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: participates,
        memberFunc: onMemberClick,
        removeFunc: onRemoveMemberClick
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