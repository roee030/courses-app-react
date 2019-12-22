import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function AddReviewButton({ isAdmin = false, isParticipate = false, onAddReviewClick }) {
    if (!isAdmin && !isParticipate)
        return;

    return (
        <Fab size="small" color="secondary" aria-label="add">
            <AddIcon onClick={onAddReviewClick}/>
        </Fab>
    )
}