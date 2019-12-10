import { Router } from 'express';
import * as webUtils from '../utils/web';
import * as authUtils from '../utils/auth';
import * as helpersUtils from '../utils/helpers';
import errors from '../errors';
import authenticateMiddleware from '../middlewares/authenticate';
import resetPasswordMiddleware from '../middlewares/reset_password';
import model from '../model_layer';

let routes = Router();

routes.post('/signin', async (req, res) => {
    const signInArgs = {
        name: req.body.name,
        idNumber: req.body.idNumber,
        idNumberConf: req.body.idNumberConf,
        personalNumber: req.body.personalNumber,
        personalNumberConf: req.body.personalNumberConf,
        hogerNumber: req.body.hogerNumber,
        hogerNumberConf: req.body.hogerNumberConf,
        phoneNumber: req.body.phoneNumber,
        birthDate: req.body.birthDate,
        password: req.body.password,
        passwordConf: req.body.passwordConf
    };
    try {
        validateSignInParams(signInArgs);
        const birthDate = formatBirthDate(signInArgs.birthDate);
        const user = await model.accounts.createUser(signInArgs.name, signInArgs.personalNumber, signInArgs.phoneNumber, birthDate);
        await model.accounts.createAuthentication(signInArgs.personalNumber, signInArgs.idNumber, signInArgs.hogerNumber, user._id, signInArgs.password);

        const token = authUtils.generateAuthenticationToken(String(user._id));
        webUtils.setAuthorizationHeader(res, token);

        return res.json({
            success: true
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.put('/login', async (req, res)=> {
    const personalNumber = req.body.personalNumber;
    const password = req.body.password;

    try {
        validatePersonalNumber(personalNumber);
        validatePassword(password);

        const isRightPassword = await model.accounts.validateAuthentication(personalNumber, password);

        if (!isRightPassword) {
            return res.json({
                success: false,
                errorCode: errors.api.accessDenied.message
            });
        }

        const user = await model.accounts.getUserByPersonalNumber(personalNumber);
        const token = await authUtils.generateAuthenticationToken(String(user._id));
        webUtils.setAuthorizationHeader(res, token);

        return res.json({
            success: true,
            data: {
                user: user
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.put('/resetPasswordCheck', async (req, res) => {
    const personalNumber = req.body.personalNumber;
    const idNumber = req.body.idNumber;
    const hogerNumber = req.body.hogerNumber;

    try {
        validatePersonalNumber(personalNumber);
        validateIdNumber(idNumber);
        validateHogerNumber(hogerNumber);

        const auth = await model.accounts.validateResetPasswordParams(personalNumber, idNumber, hogerNumber);
        const token = authUtils.generateResetPasswordToken(String(auth._id));
        webUtils.setAuthorizationHeader(res, token);

        return res.json({
            success: true
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.put('/password', resetPasswordMiddleware, async (req, res) => {
    const password = req.body.password;
    const passwordConf = req.body.passwordConf;

    try {
        validatePassword(password);

        if (password !== passwordConf)
            throw errors.accounts.passwordNotMatch;

        const user = await model.accounts.updatePassword(req.userId, password);
        const token = await authUtils.generateAuthenticationToken(String(user._id));
        webUtils.setAuthorizationHeader(res, token);

        return res.json({
            success: true,
            data: {
                user: user
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.get('/mine', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await model.accounts.get(userId);

        return res.json({
            success: true,
            data: {
                user: user
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.get('/myReviews', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const reviews = await model.reviews.getPublicByPupilId(userId);
        
        return res.json({
            success: true,
            data: {
                reviews: reviews
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.post('/review', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const pupilId = req.body.pupilId;
    const courseId = req.body.courseId;
    const title = req.body.title;
    const description = req.body.description;
    const isPublic = req.body.isPublic === 'true';

    try {
        helpersUtils.validateReviewTitle(title);
        helpersUtils.validateReviewDescription(description);

        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        helpersUtils.validatePupilIsCourseParticipate(course, pupilId);
        const user = await model.accounts.get(userId);
        const review = await model.reviews.create(userId, pupilId, courseId, user.name, course.name, title, description, false, isPublic);

        return res.json({
            success: true,
            data: {
                review: review
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.put('/forewardAdmin', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const recipientId = req.body.recipientId;

    try {
        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);

        await model.accounts.addParticipateApproved(recipientId, courseId);
        const user = await model.accounts.removeAdminApproved(userId, courseId);
        await model.courses.addAdmin(courseId, recipientId);
        await model.courses.removeAdmin(courseId, userId);

        return res.json({
            success: true,
            data: {
                user: user
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.put('/removeMyself', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        await model.courses.removeAdmin(courseId, userId);
        const user = await model.accounts.removeAdminApproved(userId, courseId);

        return res.json({
            success: true,
            data: {
                user: user
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.get('/reviews', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.query.courseId;
    const pupilId = req.query.pupilId;

    try {
        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        helpersUtils.validatePupilIsCourseParticipate(course, pupilId);

        const reviews = await model.reviews.getByPupilId(pupilId);

        return res.json({
            success: true,
            data: {
                reviews: reviews
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.get('/byPersonalNumber', authenticateMiddleware, async (req, res) => {
    const personalNumber = req.query.personalNumber;

    try {
        validatePersonalNumber(personalNumber);
        const user = await model.accounts.getUserByPersonalNumber(personalNumber);

        return res.json({
            success: true,
            data: {
                user: user
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.get('/search', authenticateMiddleware, async (req, res) => {
    const nameString = req.query.name;

    try {
        validateNameSearch(nameString);
        const result = await model.accounts.search(nameString);

        return res.json({
            success: true,
            data: {
                users: result
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.get('/multiple', async (req, res) => {
    const userIds = req.query.userIds;

    try {
        if (!userIds || userIds.length === 0) {
            return res.json({
                success: true,
                data: {
                    users: []
                }
            });
        }

        const users = await model.accounts.getMultiple(userIds);

        return res.json({
            success: true,
            data: {
                users: users
            }
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

function validateSignInParams(args) {
    if (args.idNumber !== args.idNumberConf)
        throw errors.accounts.idNumberNotMatch;

    if (args.personalNumber !== args.personalNumberConf)
        throw errors.accounts.personalNumberNotMatch;

    if (args.hogerNumber !== args.hogerNumberConf)
        throw errors.accounts.hogerNumberNotMatch;

    if (args.password !== args.passwordConf)
        throw errors.accounts.passwordNotMatch;

    validateName(args.name);
    validateIdNumber(args.idNumber);
    validatePersonalNumber(args.personalNumber);
    validateHogerNumber(args.hogerNumber);
    validatePhoneNumber(args.phoneNumber);
    validatePassword(args.password);
}

function validateNameSearch(name) {
    if (name.length < 3)
        throw errors.accounts.invalidName;
}

function validateName(name) {
    if (name.length < 3 || /^[a-zA-Z]+$/.test(name))
        throw errors.accounts.invalidName;
}

function validateIdNumber(idNumber) {
    if (idNumber.length !== 9 || !(/^\d+$/.test(idNumber)))
        throw errors.accounts.invalidIdNumber;
}

function validatePersonalNumber(personalNumber) {
    if (personalNumber.length !== 7 || !(/^\d+$/.test(personalNumber)))
        throw errors.accounts.invalidPersonalNumber;
}

function validateHogerNumber(hogerNumber) {
    if (hogerNumber.length !== 8 || !(/^\d+$/.test(hogerNumber)))
        throw errors.accounts.invalidHogerNumber;
}

function validatePhoneNumber(phoneNumber) {
    if (!(/^\d+$/.test(phoneNumber)))
        throw errors.accounts.invalidPhoneNumber;
}

function formatBirthDate(birthDate) {
    try {
        return new Date(birthDate);
    }
    catch (error) {
        console.log(`accounts api error - ${error}`);
        throw errors.accounts.invalidBirthDate;
    }
}

function validatePassword(password) {
    if (password.length < 6)
        throw errors.accounts.passwordTooWeak;
}

let router = Router();
router.use('/accounts', routes);
export default router;