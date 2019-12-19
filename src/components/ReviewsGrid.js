import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReviewCard from './ReviewCard';

function ReviewsGrid(props) {
    const reviews = props.reviews || [];

    return (
        <Grid item xs={12}>
            <Grid container justify="center" spacing={5}>
                {
                    reviews.map((item, i) => {
                        return (
                            <Grid key={'grid-' + i} item>
                                <ReviewCard key={'grid-item' + i} title={item.title} description={item.description} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}

export default ReviewsGrid;