import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetCoursePostsEffect(usersIds = []) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            if (!usersIds.length)
                return;
            setLoading(true);

            serverApi.get('users/multiple', { usersIds: usersIds }, res => {
                const data = res ? res.data : undefined;
            
                if (data && data.users)
                    setResult(data.users);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

