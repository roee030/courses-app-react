import * as webUtils from '../utils/web';
import errors from '../errors';
import * as authUtils from '../utils/auth';

export default function resetPassword(req, res, next) {
    const authHeader = webUtils.getAuthorizationHeader(req);

    if (!authHeader) {
        return res.json({
            success: false,
            errorCode: errors.api.accessDenied
        });
    }

    try {
        const verifiedToken = authUtils.validateResetPasswordToken(authHeader);
        req.authId = verifiedToken.authId;
        next();
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
}