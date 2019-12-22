import React from 'react';
import PostsGrid from '../../../components/PostsGrid';
import PostsTitle from './PostsTitle';

export default function PostsArea({ posts = [], isAdmin = false, onAddPostClick }) {
    return (
        <div id='posts'>
            <PostsTitle isAdmin={isAdmin} onAddPostClick={onAddPostClick} />
            <PostsGrid posts={posts}/>
        </div>
    )
}