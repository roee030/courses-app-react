import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetUserEffect(userId) {
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            setLoading(true);

            serverApi.get('users/', { userId: userId }, res => {
                const data = res ? res.data : undefined;
            
                if (data && data.user)
                    setResult(data.user);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

