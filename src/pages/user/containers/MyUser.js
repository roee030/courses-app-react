import React from 'react';
import UserInfo from '../../../components/UserInfo';
import ExpansionCoursesPanel from '../../../components/ExpansionCoursesPanel';
import ExpansionReviewsPanel from '../../../components/ExpansionReviewsPanel';
import UseGetCoursesEffect from '../../../hooks/UseGetCoursesEffect';
import UseGetMyReviewsEffect from '../../../hooks/UseGetMyReviewsEffect';

export default function MyUser({ myUser }) {
    const [adminApprovedCourses, isAdminApprovedCoursesLoading] = UseGetCoursesEffect(myUser.courses.admin.approved);
    const [adminPendingCourses, isAdminPendingCoursesLoading] = UseGetCoursesEffect(myUser.courses.admin.pending);
    const [participateApprovedCourses, isParticipateApprovedCoursesLoading] = UseGetCoursesEffect(myUser.courses.participate.approved);
    const [participatePendingCourses, isParticipatePendingCoursesLoading] = UseGetCoursesEffect(myUser.courses.participate.pending);
    const [reviews, isReviewsLoading] = UseGetMyReviewsEffect();

    const coursesExpansion = {
        admin: {
            approved: adminApprovedCourses,
            panding: adminPendingCourses
        },
        participate: {
            approved: participateApprovedCourses,
            panding: participatePendingCourses
        }
    };

    const details = [
        {
            title: 'שם',
            description: myUser.name
        },
        {
            title: 'מספר אישי',
            description: myUser.personalNumber
        },
        {
            title: 'מספר טלפון',
            description: myUser.phoneNumber
        }
    ]

    return (
        <div>
            <div>
                <UserInfo details={details} />
                <ExpansionCoursesPanel expansions={coursesExpansion}/>
                <ExpansionReviewsPanel reviews={reviews}/>
            </div>
        </div>
    )
}