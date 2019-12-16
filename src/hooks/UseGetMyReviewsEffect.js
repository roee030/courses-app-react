import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetMyReviewsEffect() {
    const placeHolderData = [{
        writerName: "React js full course",
        courseName: "Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!",
        title: 'this is title',
        description: 'this is a description',
        createdAt: new Date(),
        reviewId: '1213121313'
    },
    {
        writerName: "React js full course",
        courseName: "Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!",
        title: 'this is title',
        description: 'this is a description',
        createdAt: new Date(),
        reviewId: '1213121313'
    }];

    const resultDefault = [];
    const [result, setResult] = useState(resultDefault);
    const [loading, setLoading] = useState("false");
  
    useEffect(() => {
        function fetchList() {
            setLoading("true");

            serverApi.get('users/myReviews', {}, (data) => {
                console.log('users/myReviews');
                console.log(data);
                
                setResult(placeHolderData);
                setLoading('null');
                // setResult(data[serverModule])
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

