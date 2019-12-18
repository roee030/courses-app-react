import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { MDBBtn } from 'mdbreact'; // TODO: delete unnecessary

import Header from '../components/Header';
import CoursesGrid from '../components/CoursesGrid';
import MembersGrid from '../components/MembersGrid';
import UseGetCoursesEffect from '../hooks/UseGetCoursesEffect';
import UseGetCourseReviewsEffect from '../hooks/UseGetCourseReviewsEffect';
import UseGetCoursePostsEffect from '../hooks/UseGetCoursePostsEffect';
import UseGetUsersEffect from '../hooks/UseGetUsersEffect';
import * as serverApi from '../helpers/server_api';

function Course(props) {
    const user = props.user;
    const defaultCourse = props.course; // TODO: add state
    const testCourse
    const [course, setCourse] = useState(defaultCourse);
    // const userId = props.match.id;
    const userId = '123123'; // TODO: remove
    // const isCourseOpen = course.isOpen;
    const isCourseOpen = false; // TODO: remove
    const [pendingRequestsIds, setPendingRequestsIds] = useState(course.pendingRequests || []);
    const [admins, isAdminsLoading] = UseGetUsersEffect(course.admins);
    const [participates, isParticipatesLoading] = UseGetUsersEffect(course.participates);
    const [pendingRequests, isPendingRequestsLoading] = UseGetUsersEffect(course.pendingRequests);
    const [posts, isPostsLoading] = UseGetCoursePostsEffect(course._id)
    const [reviews, isReviewsLoading] = UseGetCourseReviewsEffect(course._id);
    const [subCourses, isSubCoursesLoading] = UseGetCoursesEffect(course.subCourses);
    // const [requestBtnEnable, setRequestBtnEnable] = useState(getRequestButtonEnabledState(pendingRequestsIds, userId, isCourseOpen));
    // const [removeRequestBtnEnable, setRemoveRequestBtnEnable] = useState(false);

    return (
        <div>
            <Header isLoggedIn={true}/>
            <div>
                {renderPage(userId, )}
            </div>
        </div>
    )
}

function renderPage(userId, course, subCourses, admins) {
    if (isSuperUser())
        return renderSuperUserCourse();
    else if (isAdmin())
        return renderAdminCourse();
    else if (isParticipate())
        return renderParticipateCourse();

    return renderOutsiderCourse(userId, course, subCourses, admins);
}

function isSuperUser() { // TODO: add logic
    return false;
}

function isAdmin() { // TODO: add logic
    return false;
}

function isParticipate() { // TODO: add logic
    return false;
}

function renderOutsiderCourse(userId, course, subCourses = [], admins = []) {
    const courseName = course.name;
    const courseId = course._id;
    const courseDescription = course.description;
    const mainCourseId = course.mainCourseId;
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;
    const isCourseOpen = course.isOpen;

    const [pendingRequestsIds, setPendingRequestsIds] = useState(course.pendingRequests || []);
    const membersGrid = {
        title: 'admins',
        isRemoveEnabled: false,
        list: admins,
        memberFunc: onMemberClick
    };

    return (    
        <div id='mainContainer'>
            <div id='contentContainer'>
                <div id='courseDataContainer'>
                    <div id='title'>
                        {courseName}
                    </div>
                    <div id='description'>
                        {courseDescription}
                    </div>
                        {renderMainCourseLink(mainCourseId)}
                        {renderDatesOrSubCourses(subCourses, fromDate, toDate)}
                    <div>
                        {renderRemoveOrRequestToJoinBtn(userId, courseId, pendingRequestsIds, setPendingRequestsIds, isCourseOpen)}
                    </div>
                </div>
                <div>
                    <MembersGrid members={membersGrid}/>
                </div>
            </div>
        </div>
    )
}

function onMemberClick() { //TODO: add logic

}

function onRemoveMemberClick() {

}

function renderAdminCourse() {
    return (
        <div id='mainContainer'>

        </div>
    )
}

function renderParticipateCourse() {
    return (
        <div id='mainContainer'>

        </div>
    )
}

function renderSuperUserCourse() {
    return (
        <div id='mainContainer'>

        </div>
    )
}

function getRequestButtonEnabledState(pendingRequests = [], userId, isCourseOpen = false) {
    if (pendingRequests.includes(userId) || !isCourseOpen)
        return false;
    
    return true;
}

function renderRemoveOrRequestToJoinBtn(userId, courseId, pendingRequestsIds = [], setPendingRequestsIds, isCourseOpen = false) {
    if (!isCourseOpen)
        return;

    if (pendingRequestsIds.includes(userId))
        return renderRemoveRequestToJoinBtn(setPendingRequestsIds, userId, courseId, pendingRequestsIds);

    return renderRequestToJoinBtn(setPendingRequestsIds, userId, courseId, pendingRequestsIds);
}

function renderRequestToJoinBtn(setPendingRequestsIds, userId, courseId, pendingRequestsIds) {
    return (
        <MDBBtn onClick={() => {onRequestBtnClick(setPendingRequestsIds, userId, courseId, pendingRequestsIds)}}>
            Request
        </MDBBtn>
    )
}

function renderRemoveRequestToJoinBtn(setPendingRequestsIds, userId, courseId, pendingRequestsIds) {
    return (
        <MDBBtn onClick={() => {onRemoveRequestBtnClick(setPendingRequestsIds, userId, courseId, pendingRequestsIds)}}>
            Cancel Request
        </MDBBtn>
    )
}

function onRequestBtnClick(setPendingRequestsIds, userId, courseId, pendingRequestsIds = []) {
    serverApi.put('courses/request', { courseId: courseId },() => {});
    pendingRequestsIds.push(userId);
    setPendingRequestsIds(pendingRequestsIds);
}

function onRemoveRequestBtnClick(setPendingRequestsIds, userId, courseId, pendingRequestsIds = []) {
    serverApi.put('courses/cancelRequest', { courseId: courseId}, () => {});
    pendingRequestsIds = pendingRequestsIds.filter((value) => {
        return value !== userId;
    });
    setPendingRequestsIds(pendingRequestsIds);
}

function isUserInPendingRequests(userId, pendingRequests = []) {
    return pendingRequests.includes(userId);
}

function renderMainCourseLink(mainCourseId) {
    if (!mainCourseId)
        return;

    return (
        <Link to={`/courses/${mainCourseId}`}>Main Course</Link>
    )
}

function renderDatesOrSubCourses(subCourses, fromDate, toDate) {
    if (subCourses && subCourses.length > 0)
        return renderSubCourses(subCourses);
    
    return renderDates(fromDate, toDate);
}

function renderSubCourses(courses = []) {
    if (courses.length === 0)
        return;

    return (
        <div id='subCoursesContainer'>
            <CoursesGrid courses={courses}/>
        </div>
    )
}

function renderDates(fromDate, toDate) {
    if (!fromDate || !toDate)
        return;

    return (
        <div id='datesContainer'>
            <div id='fromDate'>
                From: {fromDate}
            </div>
            <div id='toDate'>
                To: {toDate}
            </div>
        </div>
    )
}

export default Course;