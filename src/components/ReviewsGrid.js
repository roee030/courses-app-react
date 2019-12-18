import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReviewCard from './ReviewCard';

function ReviewsGrid(props) {
    const reviews = props.reviews || [];

    return (
        <div id="container">
            <div id="grid-row">
                {
                    reviews.map((item, i) => {
                        return <ReviewCard key={'grid-item' + i} title={item.title} description={item.description} />
                    })
                }
            </div>
        </div>
    )
}

export default ReviewsGrid;