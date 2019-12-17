import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function UseGetCoursePostsEffect(usersIds = []) {
    const placeHolderData = [{
        name: "React js full course",
        personalNumber: "123123",
        phoneNumber: "123123",
        myCourses: {
            admin: {
                approved: [],
                pending: []
            },
            participate: {
                approved: [],
                pending: []
            }
        },
        isSuperUser: false,
        createdAt: new Date(),
        _id: 'asas'
    },
    {
        name: "React js full course",
        personalNumber: "123123",
        phoneNumber: "123123",
        myCourses: {
            admin: {
                approved: [],
                pending: []
            },
            participate: {
                approved: [],
                pending: []
            }
        },
        isSuperUser: false,
        createdAt: new Date(),
        _id: 'asas'
    }];

    const resultDefault = [];
    const [result, setResult] = useState(resultDefault);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        function fetchList() {
            setLoading(true);

            serverApi.get('users/multiple', { usersIds: usersIds }, (data) => {
                console.log('users/multiple')
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

