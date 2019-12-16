import React, { useState } from 'react'
import CoursesGrid from '../components/CoursesGrid';
import Header from '../components/Header';
import ExpansionCoursesPanel from '../components/ExpansionCoursesPanel';
import ExpansionReviewsPanel from '../components/ExpansionReviewsPanel';
import UserInfo from '../components/UserInfo';
import UseGetCoursesEffect from '../hooks/UseGetCoursesEffect';
import UseGetUserReviewsEffect from '../hooks/UseGetUserReviewsEffect';
import UseGetMyCoursesEffect from '../hooks/UseGetMyCoursesEffect';
import UseGetMyReviewsEffect from '../hooks/UseGetMyReviewsEffect';

function User(props) {
    const user = props.user;
    const showingUser = props.showingAccount;
    const course = props.course;
    // const coursesTest = {
    //     admin: {
    //         approved: [],
    //         pending: []
    //     },
    //     participate: {
    //         approved: [],
    //         pending: []
    //     }
    // };
    // const isMyAccount = props.isMyAccount;
    // const isSuperUser = account.isSuperUser;
    // const [myAdminCourses, setMyAdminCourses] = useState([]);
    // const [myParticipateCourses, setMyParticipateCourses] = useState([]);
    
    if (isShowingUserIsTheCurrentUser(user, showingUser)) {
        return renderMyUser();
    }
    else if (isPupilOfTheUser(user, showingUser)) {
        return renderMyPupil();
    }
    else {
        return renderAnyUser();
    }

    // const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(coursesTest.admin.approved);
    // const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(coursesTest.participate.approved);
    // const courses = {
    //     admin: {
    //         approved: adminCourses
    //     },
    //     participate: {
    //         approved: participateCourses
    //     }
    // };
    // const [reviews, isReviewsLoading] = UseGetUserReviewsEffect('123', '123');

    // return (
    //     <div>
    //         <Header isLoggedIn={true}/>
    //         <div>
    //             <UserInfo />
    //             <ExpansionCoursesPanel expansions={courses}/>
    //             <ExpansionReviewsPanel reviews={reviews}/>
    //         </div>
    //     </div>
    // )
}

function renderMyUser() {
    const [courses, isCoursesLoading] = UseGetMyCoursesEffect();
    const [reviews, isReviewsLoading] = UseGetMyReviewsEffect();

    return (
        <div>
            <Header isLoggedIn={true}/>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={courses}/>
                <ExpansionReviewsPanel reviews={reviews}/>
            </div>
        </div>
    )
}

function renderMyPupil() {
    const coursesTest = {
        admin: {
            approved: [],
            pending: []
        },
        participate: {
            approved: [],
            pending: []
        }
    };
    const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(coursesTest.admin.approved);
    const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(coursesTest.participate.approved);
    const courses = {
        admin: {
            approved: adminCourses
        },
        participate: {
            approved: participateCourses
        }
    };
    const [reviews, isReviewsLoading] = UseGetUserReviewsEffect('123', '123');

    return (
        <div>
            <Header isLoggedIn={true}/>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={courses}/>
                <ExpansionReviewsPanel reviews={reviews}/>
            </div>
        </div>
    )
}

function renderAnyUser() {
    const coursesTest = {
        admin: {
            approved: [],
            pending: []
        },
        participate: {
            approved: [],
            pending: []
        }
    };
    const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(coursesTest.admin.approved);
    const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(coursesTest.participate.approved);
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
            <Header isLoggedIn={true}/>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={courses}/>
            </div>
        </div>
    )
}

function isShowingUserIsTheCurrentUser(user, showingUser) { // TODO: add logic
    return true;
}

function isPupilOfTheUser(user, showingUser) { // TODO: add logic
    return false;
}

export default User;