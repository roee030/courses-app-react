import React from 'react';
import AddReviewButton from '../../../components/AddReviewButton';

export default function ReviewsTitle({ isAdmin = false, isParticipate = false, onAddReviewClick }) {
    return (
        <div id='reviewsTitle'>
            <div>
                {isParticipate ? 'Add Review' : 'Reviews'} 
            </div>
            <AddReviewButton isAdmin={isAdmin} isParticipate={isParticipate} onAddReviewClick={onAddReviewClick} />
        </div>
    )
}