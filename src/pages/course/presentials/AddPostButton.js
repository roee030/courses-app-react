import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function AddPostButton({ isAdmin = false, onAddPostClick }) {
    if (!isAdmin)
        return (null);

    return (
        <Fab size="small" color="secondary" aria-label="add">
            <AddIcon onClick={onAddPostClick}/>
        </Fab>
    )
}