import React, { useContext, useState } from 'react';
import * as serverApi from '../../../helpers/server_api';
import AppContext from '../../../store/AppContext';
import actions from '../../../store/actions';
import * as generalUtils from '../../../helpers/general';
import LoggedOutCourse from './LoggedOutCourse';
import SuperUserCourse from './SuperUserCourse';
import AdminCourse from './AdminCourse';
import ParticipateCourse from './ParticipateCourse';
import OutsiderCourse from './OutsiderCourse';
import UseGetCoursesEffect from '../../../hooks/UseGetCoursesEffect';
import UseGetUsersEffect from '../../../hooks/UseGetUsersEffect';
import UseGetCoursePostsEffect from '../../../hooks/UseGetCoursePostsEffect';
import UseGetCourseReviewsEffect from '../../../hooks/UseGetCourseReviewsEffect';

function Course({ match, myUser, users, courses, postsState, reviewsState, dispatchUsers, dispatchCourses, dispatchPosts, dispatchReviews }) {
    const context = useContext(AppContext);
    const courseId = match.params.id;
    const [course, setCourse] = useState(courses[courseId]);

    const adminsIds = course ? course.admins : [];
    const participatesIds = course ? course.participates : [];
    const pendingRequestsIds = course ? course.pendingRequests : [];
    const subCoursesIds = course ? course.subCourses : [];

    const missingAdmins = generalUtils.getUnSavedArrayElements(adminsIds, users);
    const missingParticipates = generalUtils.getUnSavedArrayElements(participatesIds, users);
    const missingPendingRequests = generalUtils.getUnSavedArrayElements(pendingRequestsIds, users);
    const missingCourses = generalUtils.getUnSavedArrayElements(subCoursesIds, courses);


    const [subCourses, isSubCoursesLoading] = UseGetCoursesEffect(missingCourses);
    const [admins, isAdminsLoading] = UseGetUsersEffect(missingAdmins);
    const [participates, isParticipatesLoading] = UseGetUsersEffect(missingParticipates);
    const [pendingRequests, isPendingRequestsLoading] = UseGetUsersEffect(missingPendingRequests);
    const [posts, isPostsLoading] = UseGetCoursePostsEffect(courseId);
    const [reviews, isReviewsLoading] = UseGetCourseReviewsEffect(courseId);
    
    if (!course) {
        serverApi.get('courses', { courseId: courseId }, res => { // TODO: add 500 page if failed
            const data = res ? res.data : undefined;
            console.log('asasasas 2');
            console.log(data.course);
            if (data && data.course)
                setCourse(data.course);
        });

        return renderLoadingPage();
    }

    const newContext = {...context, users: users, myUser: myUser, courses: courses, posts: posts, reviews};
    return (
        <AppContext.Provider value={newContext}>
            <div>
                <div>
                    {renderPage(course, myUser, subCourses, admins, participates, pendingRequests, posts, reviews)}
                </div>
            </div>
        </AppContext.Provider>
    )
}

function renderPage(course, myUser, subCourses, admins, participates, pendingRequests, posts, reviews) {
    if (!myUser._id) {
        return (
            <LoggedOutCourse course={course} subCourses={subCourses} />
        )
    }

    if (myUser.isSuperUser) {
        return (
            <SuperUserCourse course={course} 
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
    else if (isAdmin(myUser._id, course.admins)) {
        return (
            <AdminCourse course={course} 
            subCourses={subCourses} 
            admins={admins} 
            participates={participates} 
            posts={posts} 
            reviews={reviews} 
            pendingRequests={pendingRequests} 
            onMemberClick={onMemberClick} 
            onApprovedPendingRequestClick={onApprovedPendingRequestClick} 
            onAddPostClick={onAddPostClick} 
            onAddReviewClick={onAddReviewClick} 
            onRemoveMemberClick={onRemoveMemberClick} 
            onRemovePendingClick={onRemovePendingClick} />
        )
    }
    else if (isParticipate(myUser._id, course.participates)) {
        return (
            <ParticipateCourse course={course} 
            subCourses={subCourses} 
            admins={admins} 
            participates={participates} 
            posts={posts} 
            onMemberClick={onMemberClick} 
            onRemoveMemberClick={onRemoveMemberClick} 
            onAddPostClick={onAddPostClick} 
            onAddReviewClick={onAddReviewClick}/>
        )
    }

    return (
        <OutsiderCourse course={course} myUser={myUser} subCourses={subCourses} admins={admins} onMemberClick={onMemberClick} />
    )
}

function renderLoadingPage() {
    return (
        <div>
            Loading
        </div>
    )
}

function isAdmin(userId, adminsIds = []) {
    return adminsIds.includes(userId);
}

function isParticipate(userId, participatesIds = []) {
    return participatesIds.includes(userId);
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

function onApprovedPendingRequestClick() { //TODO: add logic
    
}

function onAddPostClick() { //TODO: add logic

}

function onAddReviewClick() { //TODO: add logic

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

export default Course;