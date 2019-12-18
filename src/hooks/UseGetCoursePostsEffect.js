import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetCoursePostsEffect(courseId) {
    const placeHolderData = [{
        writerName: "React js full course",
        courseName: "Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!",
        content: 'this is content',
        createdAt: new Date(),
        _id: 'asas'
    },
    {
        writerName: "React js full course",
        courseName: "Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!",
        content: 'this is content',
        createdAt: new Date(),
        _id: 'asas'
    }];

    const resultDefault = [];
    const [result, setResult] = useState(resultDefault);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            setLoading(true);

            serverApi.get('courses/posts', { courseId: courseId }, (data) => {
                console.log('courses/posts')
                console.log(data)
                setResult(placeHolderData);
                setLoading(null);
                // setResult(data[serverModule])
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

