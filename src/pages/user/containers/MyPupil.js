import React from 'react';
import UserInfo from '../../../components/UserInfo';
import ExpansionCoursesPanel from '../../../components/ExpansionCoursesPanel';
import ExpansionReviewsPanel from '../../../components/ExpansionReviewsPanel';
import AddReviewButton from '../../../components/AddReviewButton';
import UseGetCoursesEffect from '../../../hooks/UseGetCoursesEffect';
import UseGetUserReviewsEffect from '../../../hooks/UseGetUserReviewsEffect';

export default function MyPupil({ showingUser, courseId, onAddReviewClick }) {
    const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(showingUser.courses.admin.approved);
    const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(showingUser.courses.participate.approved);
    
    const expansionCourses = {
        admin: {
            approved: adminCourses
        },
        participate: {
            approved: participateCourses
        }
    };

    const [reviews, isReviewsLoading] = UseGetUserReviewsEffect(courseId, showingUser._id);

    return (
        <div>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={expansionCourses}/>
                <AddReviewButton isAdmin={true} onAddReviewClick={onAddReviewClick} />
                <ExpansionReviewsPanel reviews={reviews}/>
            </div>
        </div>
    )
}