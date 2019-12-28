import React from 'react'
import ExpansionCoursesPanel from '../../../components/ExpansionCoursesPanel';
import ExpansionReviewsPanel from '../../../components/ExpansionReviewsPanel';
import AddReviewButton from '../../../components/AddReviewButton';
import UserInfo from '../../../components/UserInfo';
import UseGetCoursesEffect from '../../../hooks/UseGetCoursesEffect';
import UseGetUserReviewsEffect from '../../../hooks/UseGetUserReviewsEffect';
import UseGetMyCoursesEffect from '../../../hooks/UseGetMyCoursesEffect';
import UseGetMyReviewsEffect from '../../../hooks/UseGetMyReviewsEffect';
import UseGetUserEffect from '../../../hooks/UseGetUserEffect';

function User({ match, myUser }) {
    const userId = match.params.id;

    if (isShowingUserIsTheCurrentUser(myUser._id, userId))
        return renderMyUser();

    const [showingUser, isShowingUserLoading] = UseGetUserEffect(userId);

    if (!showingUser._id)
        return renderLoadingPage();

    const relatedAdminCourseId = getRelatedAdminCourseId(myUser, showingUser);
    if (relatedAdminCourseId)
        return renderMyPupil(showingUser, relatedAdminCourseId);

    return renderAnyUser(showingUser);
}

function renderLoadingPage() {
    return (
        <div>
            Loading
        </div>
    )
}

function renderMyUser() {
    const [courses, isCoursesLoading] = UseGetMyCoursesEffect();
    const [reviews, isReviewsLoading] = UseGetMyReviewsEffect();

    return (
        <div>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={courses}/>
                <ExpansionReviewsPanel reviews={reviews}/>
            </div>
        </div>
    )
}

function renderMyPupil(showingUser, courseId) {
    const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(showingUser.courses.admin.approved);
    const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(showingUser.courses.participate.approved);
    const courses = {
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
                <ExpansionCoursesPanel expansions={courses}/>
                <AddReviewButton isAdmin={true} onAddReviewClick={onAddReviewClick} />
                <ExpansionReviewsPanel reviews={reviews}/>
            </div>
        </div>
    )
}

function renderAnyUser(showingUser) {
    const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(showingUser.courses.admin.approved);
    const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(showingUser.courses.participate.approved);
    const courses = {
        admin: {
            approved: adminCourses
        },
        participate: {
            approved: participateCourses
        }
    };

    return (
        <div>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={courses}/>
            </div>
        </div>
    )
}

function onAddReviewClick() {// TODO add logic

}

function isShowingUserIsTheCurrentUser(myUserId, showingUserId) {
    if (myUserId === showingUserId)
        return true;

    return false;
}

function getRelatedAdminCourseId(myUser, showingUser) {
    const myAdminCourses = myUser.courses.admin.approved || [];
    const showingUserCourses = showingUser.courses.participate.approved || [];

    for (let i = 0; i < myAdminCourses.length; i++) {
        if (showingUserCourses.includes(myAdminCourses[i]))
            return myAdminCourses[i];
    }

    return;
}

export default User;