import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetCoursePostsEffect(courseId) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            if (!courseId)
                return;
                
            setLoading(true);

            serverApi.get('courses/posts', { courseId: courseId }, res => {
                const data = res ? res.data : undefined;
            
                if (data && data.posts)
                    setResult(data.posts);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

