import React, { useContext, useState } from 'react';
import * as serverApi from '../../../helpers/server_api';
import AppContext from '../../../store/AppContext';
import actions from '../../../store/actions';
import LoggedOutCourse from './LoggedOutCourse';
import SuperUserCourse from './SuperUserCourse';
import AdminCourse from './AdminCourse';
import ParticipateCourse from './ParticipateCourse';
import OutsiderCourse from './OutsiderCourse';

function Course({ match, myUser, users, courses }) {
    const context = useContext(AppContext);
    const courseId = match.params.id;
    const [course, setCourse] = useState(courses[courseId]);
    const [subCourses, setSubCourses] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [participates, setParticipates] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);

    if (!course) {
        serverApi.get('courses', { courseId: courseId }, res => { // TODO: add 500 page if failed
            const data = res ? res.data : undefined;

            if (data && data.course) {
                setCourse(data.course);
                setCourseData(data.course, setAdmins, setParticipates, setPendingRequests, setSubCourses, setPosts, setReviews);
            }
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

function setCourseData(course, setAdmins, setParticipates, setPendingRequests, setSubCourses, setPosts, setReviews) {
    if (course.admins.length)
        getUsers(setAdmins, course.admins);

    if (course.participates.length)
        getUsers(setParticipates, course.participates);

    if (course.pendingRequests.length)
        getUsers(setPendingRequests, course.pendingRequests);

    if (course.subCourses.length)
        getSubCourses(setSubCourses, course.subCourses);

    if (course.posts.length)
        getPosts(setPosts, course._id);

    if (course.reviews.length)
        getReviews(setReviews, course._id);
}

function getSubCourses(setSubCourses, coursesIds = []) {
    if (!coursesIds.length)
        return;

    serverApi.get('courses/multiple', { coursesIds: coursesIds }, res => {
        const data = res ? res.data : undefined;
    
        if (data && data.courses)
            setSubCourses(data.courses);
    });
}

function getUsers(setUsers, usersIds = []) {
    if (!usersIds.length)
        return;

    serverApi.get('users/multiple', { usersIds: usersIds }, res => {
        const data = res ? res.data : undefined;
    
        if (data && data.users)
            setUsers(data.users);
    });
}

function getPosts(setPosts, courseId) {
    serverApi.get('courses/posts', { courseId: courseId }, res => {
        const data = res ? res.data : undefined;
    
        if (data && data.posts)
            setPosts(data.posts);
    });
}

function getReviews(setReviews, courseId) {
    serverApi.get('courses/reviews', { courseId: courseId }, res => {
        const data = res ? res.data : undefined;
    
        if (data && data.reviews)
            setReviews(data.reviews);
    });
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