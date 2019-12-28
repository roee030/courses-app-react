import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetMyReviewsEffect() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            setLoading(true);

            serverApi.get('users/myReviews', {}, res => {
                const data = res ? res.data : undefined;
            
                if (data && data.reviews)
                    setResult(data.reviews);
            });
        }

        fetchList();

    }, []);
  
    return [result, loading];
}

