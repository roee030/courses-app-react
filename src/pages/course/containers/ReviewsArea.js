import React from 'react';
import ReviewsTitle from '../presentials/ReviewsTitle';
import ReviewsGrid from '../../../components/ReviewsGrid';

export default function ReviewsArea({ reviews = [], isAdmin = false, isParticipate = false, isSuperUser = false, onAddReviewClick }) {
    return (
        <div id='reviews'>
            <ReviewsTitle isAdmin={isAdmin} isParticipate={isParticipate} onAddReviewClick={onAddReviewClick} />
            {isAdmin || isSuperUser ? <ReviewsGrid reviews={reviews}/> : undefined}
        </div>
    )
}