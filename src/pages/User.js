import React, { useState } from 'react'
import CoursesGrid from '../components/CoursesGrid';
import Header from '../components/Header';
import ExpansionCoursesPanel from '../components/ExpansionCoursesPanel';
import UserInfo from '../components/UserInfo';
import UseGetCoursesEffect from '../hooks/UseGetCoursesEffect';

function User(props) {
    const account = props.account;
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
    // const isMyAccount = props.isMyAccount;
    // const isSuperUser = account.isSuperUser;
    const [myAdminCourses, setMyAdminCourses] = useState([]);
    const [myParticipateCourses, setMyParticipateCourses] = useState([]);
    const [courses, isLoading] = UseGetCoursesEffect();

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

export default User;