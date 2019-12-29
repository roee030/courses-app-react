import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetCoursesEffect(coursesIds = []) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            if (!coursesIds.length)
                return;

            setLoading(true);

            serverApi.get('courses/multiple', { coursesIds: coursesIds }, res => {
                const data = res ? res.data : undefined;
            
                if (data && data.courses)
                    setResult(data.courses);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

