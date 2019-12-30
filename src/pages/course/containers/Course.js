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
                    {renderPage(course,
                        setCourse,
                        myUser,
                        subCourses,
                        admins,
                        setAdmins,
                        participates,
                        setParticipates,
                        pendingRequests,
                        setPendingRequests,
                        posts,
                        reviews)}
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

function renderPage(course,
    setCourse,
    myUser,
    subCourses,
    admins,
    setAdmins,
    participates,
    setParticipates,
    pendingRequests,
    setPendingRequests,
    posts,
    reviews) {
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
                onRemoveAdminClick={memberId => { onRemoveAdminClick(memberId, course, setCourse, admins, setAdmins)}} 
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
                onApprovedPendingRequestClick={memberId => { onApprovedPendingRequestClick(memberId, course, setCourse, pendingRequests, setPendingRequests, participates, setParticipates)}} 
                onAddPostClick={onAddPostClick} 
                onAddReviewClick={onAddReviewClick} 
                onRemoveMemberClick={memberId => { onRemoveMemberClick(memberId, course, setCourse, participates, setParticipates)}} 
                onRemovePendingClick={memberId => { onRemovePendingClick(memberId, course, setCourse, pendingRequests, setPendingRequests)}} />
        )
    }
    else if (isParticipate(myUser._id, course.participates)) {
        return (
            <ParticipateCourse course={course} 
                subCourses={subCourses} 
                admins={admins} 
                participates={participates} 
                posts={posts} 
                onAddPostClick={onAddPostClick} 
                onAddReviewClick={onAddReviewClick}/>
        )
    }

    return (
        <OutsiderCourse course={course} myUser={myUser} subCourses={subCourses} admins={admins} />
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

function onRemoveMemberClick(pupilId, course, setCourse, participates, setParticipates) {
    serverApi.put('courses/removeParticipate', { courseId: course._id, pupilId: pupilId }, () => {});

    const newParticipates = participates.filter(participate => participate._id !== pupilId);
    setParticipates(newParticipates);
    const newCourse = {...course};
    newCourse.participates = newCourse.participates.filter(participateId => participateId !== pupilId);
    setCourse(newCourse);
}

function onRemovePendingClick(pupilId, course, setCourse, pendingRequests, setPendingRequests) {
    serverApi.put('courses/declineParticipate', { courseId: course._id, pupilId: pupilId }, () => {});

    const newPendingRequests = pendingRequests.filter(pending => pending._id !== pupilId);
    setPendingRequests(newPendingRequests);
    const newCourse = {...course};
    newCourse.pendingRequests = newCourse.pendingRequests.filter(pendingId => pendingId !== pupilId);
    setCourse(newCourse);
}

function onRemoveAdminClick(adminId, course, setCourse, admins, setAdmins) {
    serverApi.put('courses/removeAdmin', { courseId: course._id, recipientId: adminId }, () => {});

    const newAdmins = admins.filter(admin => admin._id !== adminId);
    setAdmins(newAdmins);
    const newCourse = {...course};
    newCourse.admins = newCourse.admins.filter(userId => userId !== adminId);
    setCourse(newCourse);
}

function onAddAdminClick() { //TODO: add logic

}

function onApprovedPendingRequestClick(pupilId, course, setCourse, pendingRequests, setPendingRequests, participates, setParticipates) { //TODO: add logic
    serverApi.put('courses/approveParticipate', { courseId: course._id, pupilId: pupilId }, () => {});

    let formerPending;
    const newPendingRequests = pendingRequests.filter(pending => {
        if (pending._id === pupilId) {
            formerPending = pending;
            return false;
        }

        return true;
    });
    setPendingRequests(newPendingRequests);
    const newParticipates = [...participates].push(formerPending);
    setParticipates(newParticipates);
    const newCourse = {...course};
    newCourse.pendingRequests = newCourse.pendingRequests.filter(userId => userId !== pupilId);
    newCourse.participates = newCourse.participates.push(pupilId);
    setCourse(newCourse);
}

function onAddPostClick() { //TODO: add logic

}

function onAddReviewClick() { //TODO: add logic

}

export default Course;