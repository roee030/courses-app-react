import jwt from 'jsonwebtoken';
import * as config from '../config';
import errors from '../errors';

const userTokenRenewTime = 604800; // SECONDS (7 days)
const expirationTime = '7d'; // expires in 7 days
const resetPasswordExpirationTime = 600; // SECONDS (10 minutes)

export function validateAuthToken(token) {
    try {
        const secret = config.getAuthTokenSecret();
        const decoded = jwt.verify(token, secret);

        if (!('userId' in decoded) || !('exp' in decoded))
            throw errors.api.invalidAccessToken;

        const nowSec = Math.floor(Date.now() / 1000);
        const resultData = {
            userId: decoded.userId,
            token: token
        };
        if (nowSec - decoded.exp < userTokenRenewTime) {
            const newToken = generateAuthenticationToken(decoded.userId);
            resultData.token = newToken;
        }

        return resultData;
    }
    catch (error) {
        if ((error.name === 'TokenExpiredError'))
            throw errors.api.expiredAccessToken;

        throw errors.api.invalidAccessToken;
    }
}

export function validateResetPasswordToken(token) {
    try {
        const secret = config.getAuthTokenSecret();
        const decoded = jwt.verify(token, secret);

        if (!('auth' in decoded) || !('exp' in decoded))
            throw errors.api.invalidAccessToken;

        return decoded.authId;
    }
    catch (error) {
        if ((error.name === 'TokenExpiredError'))
            throw errors.api.expiredAccessToken;

        throw errors.api.invalidAccessToken;
    }
}

export function generateResetPasswordToken(authId) {
    const secret = config.getAuthTokenSecret();
    return createToken({ authId: String(authId) }, secret, resetPasswordExpirationTime);
}

export function generateAuthenticationToken(userId) {
    const secret = config.getAuthTokenSecret();
    return createToken({ userId: String(userId) }, secret, expirationTime);
}

export function createToken(payload, secret,  expiresIn) {
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
    return token;
}