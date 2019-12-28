import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetMyCoursesEffect() {
    const resultDefault = {
        admin: {
            approved: [],
            pending: []
        },
        participate: {
            approved: [],
            pending: []
        }
    };
    const [result, setResult] = useState(resultDefault);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            setLoading(true);

            serverApi.get('courses/mine', {}, res => {
                const data = res ? res.data : undefined;
            
                if (data)
                    setResult(data);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

