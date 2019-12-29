import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetCourseReviewsEffect(courseId) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            if (!courseId)
                return;

            setLoading(true);

            serverApi.get('courses/reviews', { courseId: courseId }, res => {
                const data = res ? res.data : undefined;
            
                if (data && data.reviews)
                    setResult(data.reviews);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

