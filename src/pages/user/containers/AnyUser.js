import React from 'react';
import UserInfo from '../../../components/UserInfo';
import ExpansionCoursesPanel from '../../../components/ExpansionCoursesPanel';
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

    return (
        <div>
            <div>
                <UserInfo />
                <ExpansionCoursesPanel expansions={expansionCourses}/>
            </div>
        </div>
    )
}