import React, { useState, useContext, useReducer } from 'react';
import { Link } from "react-router-dom";
import * as serverApi from '../../../helpers/server_api';
import AppContext from '../../../helpers/AppContext';
import reducers from '../../../reducers';
import actions from '../../../actions';
import * as generalUtils from '../../../helpers/general';
import LoggedOutCourse from './LoggedOutCourse';
import SuperUserCourse from './SuperUserCourse';
import AdminCourse from './AdminCourse';
import ParticipateCourse from './ParticipateCourse';
import OutsiderCourse from './OutsiderCourse';

function Course(props) {
    const context = useContext(AppContext);
    const courseId = props.match.id;
    const [users, dispatchUsers] = useReducer(reducers.users.updateUsers, context.users);
    const [myUser, dispatchMyUser] = useReducer(reducers.users.updateUsers, context.myUser);
    const [courses, dispatchCourses] = useReducer(reducers.courses.updateCourses, context.courses);
    const [postsState, dispatchPosts] = useReducer(reducers.courses.updatePosts, context.posts);
    const [reviewsState, dispatchReviews] = useReducer(reducers.courses.updateReviews, context.reviews);
    const course = courses[courseId];
    
    if (!course) {
        serverApi.get('courses', { courseId: courseId }, res => { // TODO: add 500 page if failed
            const data = res ? res.data : undefined;
            
            if (data && data.course)
                dispatchCourses(actions.courses.addCourse(data.course));
        });

        return renderLoadingPage();
    }

    const adminsIds = course.admins;
    const participatesIds = course.participates;
    const pendingRequestsIds = course.pendingRequests;
    const postsIds = course.posts;
    const reviewsIds = course.reviews;
    const subCoursesIds = course.subCourses;

    const missingAdmins = generalUtils.getUnSavedArrayElements(adminsIds, users);
    const missingParticipates = generalUtils.getUnSavedArrayElements(participatesIds, users);
    const missingPendingRequests = generalUtils.getUnSavedArrayElements(pendingRequestsIds, users);
    const totalMissingUsers = [...missingAdmins, ...missingParticipates, ...missingPendingRequests];
    const missingPosts = generalUtils.getUnSavedArrayElements(postsIds, postsState);
    const missingReviews = generalUtils.getUnSavedArrayElements(reviewsIds, reviewsState);
    const missingCourses = generalUtils.getUnSavedArrayElements(subCoursesIds, courses);

    loadData(courseId, dispatchUsers, dispatchCourses, dispatchPosts, dispatchReviews, totalMissingUsers, missingPosts, missingReviews, missingCourses);

    const subCourses = generalUtils.getValuesFromStateByArray(courses, subCoursesIds);
    const admins = generalUtils.getValuesFromStateByArray(users, adminsIds);
    const participates = generalUtils.getValuesFromStateByArray(users, participatesIds);
    const pendingRequests = generalUtils.getValuesFromStateByArray(users, pendingRequestsIds);
    const posts = generalUtils.getValuesFromStateByArray(postsState, postsIds);
    const reviews = generalUtils.getValuesFromStateByArray(reviewsState, reviewsIds);

    return (
        <div>
            <div>
                {renderPage(myUser, course, subCourses, admins, participates, pendingRequests, posts, reviews)}
            </div>
        </div>
    )
}

function loadData(courseId, dispatchUsers, dispatchCourses, dispatchPosts, dispatchReviews,  totalMissingUsers = [], missingPosts = [], missingReviews = [], missingCourses = []) {
    if (totalMissingUsers.length > 0) {
        serverApi.get('users/multiple', { usersIds: totalMissingUsers }, res => {
            const data = res ? res.data : undefined;

            if (data && data.users)
                dispatchUsers(actions.users.addUsers(data.users));
        });
    }

    if (missingPosts.length > 0) {
        serverApi.get('courses/posts', { courseId: courseId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.posts)
                dispatchPosts(actions.courses.addPosts(data.posts));
        });
    }

    if (missingReviews.length > 0) {
        serverApi.get('courses/reviews', { courseId: courseId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.reviews)
                dispatchReviews(actions.courses.addReviews(data.reviews));
        });
    }

    if (missingCourses.length > 0) {
        serverApi.get('courses/multiple', { coursesIds: missingCourses }, res => {
            const data = res ? res.data : undefined;

            if (data && data.courses)
                dispatchCourses(actions.courses.addCourses(data.courses));
        });
    }
}

function renderPage(courseId, myUser, subCourses, admins, participates, pendingRequests, posts, reviews) {
    if (!myUser) {
        return (
            <LoggedOutCourse courseId={courseId} subCourses={subCourses} />
        )
    }

    if (myUser.isSuperUser) {
        return (
            <SuperUserCourse courseId={courseId} 
            subCourses={subCourses} 
            admins={admins} 
            participates={participates} 
            reviews={reviews} 
            onAddAdminClick={onAddAdminClick} 
            onMemberClick={onMemberClick} 
            onRemoveAdminClick={onRemoveAdminClick} 
            onAddReviewClick={onAddReviewClick} />
        )
    }
    else if (isAdmin(myUser._id, admins)) {
        return (
            <AdminCourse courseId={courseId} 
            subCourses={subCourses} 
            admins={admins} 
            participates={participates} 
            posts={posts} 
            reviews={reviews} 
            pendingRequests={pendingRequests} 
            onMemberClick={onMemberClick} 
            onApprovePendingRequestClick={onApprovePendingRequestClick} 
            onAddPostClick={onAddPostClick} 
            onAddReviewClick={onAddReviewClick} 
            onRemoveMemberClick={onRemoveMemberClick} 
            onRemovePendingClick={onRemovePendingClick} />
        )
    }
    else if (isParticipate(myUser._id, participates)) {
        <ParticipateCourse courseId={courseId} 
        subCourses={subCourses} 
        admins={admins} 
        participates={participates} 
        posts={posts} 
        onMemberClick={onMemberClick} 
        onRemoveMemberClick={onRemoveMemberClick} 
        onAddPostClick={onAddPostClick} />
    }

    return (
        <OutsiderCourse courseId={courseId} subCourses={subCourses} admins={admins} onMemberClick={onMemberClick} />
    )
}

function renderLoadingPage() {
    return (
        <div>
            Loading
        </div>
    )
}

function isAdmin(userId, admins = []) {
    const isAdmin = admins.some((admin) => {
        return admin._id === userId;
    });

    return isAdmin;
}

function isParticipate(userId, participates = []) {
    const isParticipate = participates.some((participate) => {
        return participate._id === userId;
    });

    return isParticipate
}

function onMemberClick() { //TODO: add logic

}

function onRemoveMemberClick() { //TODO: add logic

}

function onRemovePendingClick() { //TODO: add logic

}

function onRemoveAdminClick() { //TODO: add logic

}

function onAddAdminClick() { //TODO: add logic

}

function onApprovePendingRequestClick() { //TODO: add logic
    
}

function onAddPostClick() { //TODO: add logic

}

function onAddReviewClick() { //TODO: add logic

}

export default Course;