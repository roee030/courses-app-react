import React, { useState} from 'react';
import UserInfo from '../../../components/UserInfo';
import ExpansionCoursesPanel from '../presentials/ExpansionCoursesPanel';
import ExpansionReviewsPanel from '../presentials/ExpansionReviewsPanel';
import AddReviewButton from '../../../components/AddReviewButton';
import UseGetCoursesEffect from '../../../hooks/UseGetCoursesEffect';
import UseGetUserReviewsEffect from '../../../hooks/UseGetUserReviewsEffect';
import * as serverApi from '../../../helpers/server_api';
import ReviewPopUp from '../../course/presentials/ReviewPopUp';

export default function MyPupil({ showingUser, courseId, onAddReviewClick }) {
    const [adminCourses, isAdminCoursesLoading] = UseGetCoursesEffect(showingUser.courses.admin.approved);
    const [participateCourses, isParticipateCoursesLoading] = UseGetCoursesEffect(showingUser.courses.participate.approved);
    const [reviewPopUp, setReviewPopUp] = useState(false);
    
    const expansionCourses = {
        admin: {
            approved: adminCourses
        },
        participate: {
            approved: participateCourses
        }
    };

    const [reviews, setReviews] = useState([]);
    const [firstReviews, isFirstReviewsLoading] = UseGetUserReviewsEffect(courseId, showingUser._id);

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
                <AddReviewButton isAdmin={true} onAddReviewClick={onAddReviewClick} />
                <ExpansionReviewsPanel reviews={[...firstReviews, ...reviews]}/>
                {reviewPopUp ? (<ReviewPopUp  />) : null }
            </div>
        </div>
    )

    // function loadReviews() {
    //     serverApi.get('users/reviews', { courseId: courseId, pupilId: showingUser._id }, res => {
    //         const data = res ? res.data : undefined;
        
    //         if (data && data.reviews)
    //             setReviews(data.reviews);
    //     });
    // }
}