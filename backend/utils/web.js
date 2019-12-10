export function getAuthorizationHeader(req) {
    return req.headers['x-access-token'] || req.headers['authorization'];
}

export function setAuthorizationHeader(res, accessToken) {
    return res.set('authorization', 'bearer ' + accessToken);
}