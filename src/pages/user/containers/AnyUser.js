import React from 'react';
import UserInfo from '../../../components/UserInfo';
import ExpansionCoursesPanel from '../presentials/ExpansionCoursesPanel';
import UseGetCoursesEffect from '../../../hooks/UseGetCoursesEffect';

export default function AnyUser({ showingUser }) {
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

    const details = [
        {
            title: 'שם',
            description: showingUser.name
        },
        {
            title: 'מספר אישי',
            description: showingUser.personalNumber
        },
        {
            title: 'מספר טלפון',
            description: showingUser.phoneNumber
        }
    ];

    return (
        <div>
            <div>
                <UserInfo details={details} />
                <ExpansionCoursesPanel expansions={expansionCourses}/>
            </div>
        </div>
    )
}