import React from 'react';
import AddPostButton from './AddPostButton';

export default function PostsTitle({ isAdmin = false, onAddPostClick }) {
    return (
        <div id='postsTitle'>
            <div>
                Posts 
            </div>
            <AddPostButton isAdmin={isAdmin} onAddPostClick={onAddPostClick} />
        </div>
    )
}