import React, { useState, useEffect } from 'react';
import * as serverApi from '../helpers/server_api';

export default function useAsyncSearchHook(serverModule = 'courses', nameString, component) {
    const fullModule = `${serverModule}/search`;
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState("false");
  
    useEffect(() => {
        function fetchSearchList() {
            setLoading("true");

            serverApi.get(fullModule, nameString, (data) => {
                console.log('asasasasd')
                console.log(data)
                setResult([{ name: 'asas', description: 'wewewe' }]);
                setLoading('null');
                // setResult(data[serverModule])
            });
        }

        if (nameString !== '') {
            fetchSearchList();
        }
    }, [nameString]);
  
    return [result, loading];
}

