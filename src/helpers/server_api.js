import axios from 'axios';

let accesToken = localStorage.getItem('token') || null;
const serverUrl = 'http://localhost:3010/';

export async function post(serverModule, body, callback) {
    request('post', serverModule, body, callback);
}

export async function put(serverModule, body, callback) {
    request('put', serverModule, body, callback);
}

export async function get(serverModule, qs, callback) {
    request('get', serverModule, qs, callback);
}

export function logOut() {
    localStorage.setItem('token', undefined);
    localStorage.setItem('myUser', '{}');
    accesToken = null;
}

async function request(type, serverModule, args, callback) {
    try {
        const url = serverUrl + serverModule;
        const config = accesToken ? buildTokenHeader() : undefined;
        let res;

        switch (type) {
            case 'post':                
                res = await axios.post(url, args, config);
                break;
            case 'put':
                res = await axios.put(url, args, config);
                break;
            default:
                res = await axios.get(url + buildQueryStrings(args), config);

        }
        checkHeaderAndSaveAccesToken(res);
        callback(res.data);
    }
    catch (error) {
        console.log(`network error - ${error}`);
    }
}

function buildTokenHeader() {
    return {
        headers: {
            authorization: accesToken
        }
    };
}

function buildQueryStrings(args) {
    if (Object.keys(args).length === 0)
        return '';

    let qsString = '?';
    for (const key in args)
        qsString += `${key}=${String(args[key])}&`;

    return qsString;
}

function checkHeaderAndSaveAccesToken(response) {
    if (response && response.headers && response.headers.authorization) {
        localStorage.setItem('token', response.headers.authorization);
        accesToken = response.headers.authorization;
    }
}