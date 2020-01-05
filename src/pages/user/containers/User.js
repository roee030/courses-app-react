import React, { useState } from 'react';
import ExpansionCoursesPanel from '../presentials/ExpansionCoursesPanel';
import ExpansionReviewsPanel from '../presentials/ExpansionReviewsPanel';
import AddReviewButton from '../../../components/AddReviewButton';
import MyUser from './MyUser';
import MyPupil from './MyPupil';
import AnyUser from './AnyUser';
import * as serverApi from '../../../helpers/server_api';

function User({ match, myUser, users, courses, dispatchCourses }) {
    const userId = match.params.id;
    const [showingUser, setShowingUser] = useState(users[userId]);

    if (isShowingUserIsTheCurrentUser(myUser._id, userId)) {
        return (
            <MyUser myUser={myUser} />
        )
    }

    if (!showingUser) {
        serverApi.get('users/', { userId: userId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.user)
                setShowingUser(data.user)
        });
        return renderLoadingPage();
    }

    if (myUser._id) {
        const relatedAdminCourseId = getRelatedAdminCourseId(myUser, showingUser);
        if (relatedAdminCourseId) {
            return (
                <MyPupil showingUser={showingUser} 
                    onAddReviewClick={onAddReviewClick} 
                    courseId={relatedAdminCourseId}  />
            )
        }
    }

    return (
        <AnyUser showingUser={showingUser} />
    )
}

function renderLoadingPage() {
    return (
        <div>
            Loading
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