import React from 'react'
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

function PostsGrid(props) {
    const posts = props.posts || [];
    
    return (
        <Grid container direction='column' justify='space-evenly' alignItems='center'>
            {renderPosts(posts)}
        </Grid>
    )
}

function renderPosts(posts = []) {
    return (
        posts.map((post) => {
            return (
                <Post content={post.content} />
            )
        })
    )
}

export default PostsGrid;