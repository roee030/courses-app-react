import { Router } from 'express';
import * as webUtils from '../utils/web';
import * as authUtils from '../utils/auth';
import * as helpersUtils from '../utils/helpers';
import errors from '../errors';
import authenticateMiddleware from '../middlewares/authenticate';
import model from '../model_layer';

const courseTags = {
    core: 1,
    advanced: 1,
    professional: 1,
    command: 1
};

let routes = Router();

routes.get('/mine', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await model.accounts.get(userId);
        const courses = {
            admin: {
                approved: [],
                pending: []
            },
            participate: {
                approved: [],
                pending: []
            }
        };

        courses.admin.approved = await model.courses.getMultiple(user.courses.admin.approved);
        courses.admin.pending = await model.courses.getMultiple(user.courses.admin.pending);
        courses.participate.approved = await model.courses.getMultiple(user.courses.participate.approved);
        courses.participate.pending = await model.courses.getMultiple(user.courses.participate.pending);

        return res.json({
            success: true,
            data: courses
        });
    }
    catch (error) {
        return res.json({
            success: false,
            errorCode: error.message
        });
    }
});

routes.post('/post', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const content = req.body.content;

    try {
        validatePostContent(content);
        const oldCourse = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(oldCourse, userId);
        const user = await model.accounts.get(userId);
        const post = await model.posts.create(userId, user.name, courseId, oldCourse.name, content);
        await model.courses.addPost(courseId, post._id);

        return res.json({
            success: true,
            data: {
                post: post
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

routes.put('/approveParticipate', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const pupilId = req.body.pupilId;

    try {
        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        await model.courses.addParticipate(courseId, pupilId);
        await model.courses.removePendingRequest(courseId, pupilId);
        await model.accounts.addParticipateApproved(pupilId, courseId);
        const newCourse = await model.accounts.removeParticipatePending(pupilId, courseId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/declineParticipate', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const pupilId = req.body.pupilId;

    try {
        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        await model.accounts.removeParticipatePending(pupilId, courseId);
        const newCourse = await model.courses.removePendingRequest(courseId, pupilId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/cancelRequest', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        const course = await model.courses.removePendingRequest(courseId, userId);
        await model.accounts.removeParticipatePending(userId, courseId);

        return res.json({
            success: true,
            data: {
                course: course
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

routes.put('/removeParticipate', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const pupilId = req.body.pupilId;

    try {
        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        await model.accounts.removeParticipateApproved(pupilId, courseId);
        const newCourse = await model.courses.removeParticipate(courseId, pupilId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/request', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        const course = await model.courses.get(courseId);

        if (!course.isOpen)
            throw errors.courses.courseIsClose;

        const newCourse = await model.courses.addPendingRequest(courseId, userId);
        await model.accounts.addParticipatePending(userId, courseId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/addParticipate', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const pupilId = req.body.pupilId;

    try {
        const course = await model.courses.get(courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        await model.accounts.addParticipateApproved(pupilId, courseId);
        const newCourse = await model.courses.addParticipate(courseId, userId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/removePost', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const postId = req.body.postId;

    try {
        const post = await model.posts.get(postId);
        const course = await model.courses.get(post.courseId);
        helpersUtils.validateUserIsCourseAdmin(course, userId);
        const newCourse = await model.courses.removePost(course._id, postId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.get('/posts', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.query.courseId;

    try {
        const course = await model.courses.get(courseId);
        try {
            helpersUtils.validatePupilIsCourseParticipate(course, userId);
        }
        catch (error) {
            helpersUtils.validateUserIsCourseAdmin(course, userId);
        }
        const posts = await model.posts.getMultiple(course.posts);

        return res.json({
            success: true,
            data: {
                posts: posts
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

routes.post('/', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const name = req.body.name || '';
    const description = req.body.description || '';
    const coreFileLink = req.body.coreFileLink || '';
    const isCampus = req.body.isCampus === 'true';
    const tags = req.body.tags;
    let coreFileExpirationDate = req.body.coreFileExpirationDate;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;

    try {
        await validateUserIsSuperUser(userId);
        validateCourseName(name);
        validateCourseDescription(description);
        validateCourseCoreFileLink(coreFileLink);
        validateTags(tags);
        fromDate = fromDate ? formatCourseDate(fromDate) : undefined;
        toDate = toDate ? formatCourseDate(toDate) : undefined;
        coreFileExpirationDate = formatCourseDate(coreFileExpirationDate)

        const course = await model.courses.create(name, description, coreFileLink, coreFileExpirationDate, fromDate, toDate, isCampus, tags);

        return res.json({
            success: true,
            data: {
                course: course
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

routes.post('/class', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const mainCourseId = req.body.mainCourseId;
    let name = req.body.name;
    let description = req.body.description;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;

    try {
        await validateUserIsSuperUser(userId);
        fromDate = formatCourseDate(fromDate);
        toDate = formatCourseDate(toDate);

        const mainCourse = await model.courses.get(mainCourseId);
        name = name ? name : mainCourse.name;
        description = description ? description : mainCourse.description;
        const coreFileLink = mainCourseId.coreFile.link;
        const coreFileExpirationDate = mainCourseId.coreFile.expireIn;
        const isCampus = mainCourse.isCampus;
        const tags = mainCourse.tags;

        const course = await model.courses.create(name, description, coreFileLink, coreFileExpirationDate, fromDate, toDate, isCampus, tags, mainCourseId);
        await model.courses.addSubCourse(mainCourseId, course._id);

        return res.json({
            success: true,
            data: {
                course: course
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

routes.put('/removeClass', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const mainCourseId = req.body.mainCourseId;
    const subCourseId = req.body.subCourseId;

    try {
        await validateUserIsSuperUser(userId);
        await model.courses.removeMainCourseId(subCourseId);
        const newCourse = await model.courses.removeSubCourse(mainCourseId, subCourseId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const name = req.body.name || '';
    const description = req.body.description || '';
    const coreFileLink = req.body.coreFileLink || '';
    let isCampus;
    let coreFileExpirationDate = req.body.coreFileExpirationDate;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;

    try {
        const course = await model.courses.get(courseId);
        try {
            helpersUtils.validateUserIsCourseAdmin(course, userId);
        }
        catch (error) {
            await validateUserIsSuperUser(userId);
        }

        name ? validateCourseName(name) : undefined;
        description ? validateCourseDescription(description) : undefined;
        coreFileLink ? validateCourseCoreFileLink(coreFileLink) : undefined;
        coreFileExpirationDate = coreFileExpirationDate ? formatCourseDate(coreFileExpirationDate) : undefined;
        fromDate = fromDate ? formatCourseDate(fromDate) : undefined;
        toDate = toDate ? formatCourseDate(toDate) : undefined;
        isCampus = isCampus ? req.body.isCampus === 'true' : undefined;

        const newCourse = await model.courses.update(courseId, name, description, coreFileLink, coreFileExpirationDate, fromDate, toDate, isCampus);
        
        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/open', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        const course = await model.courses.get(courseId);
        try {
            helpersUtils.validateUserIsCourseAdmin(course, userId);
        }
        catch (error) {
            await validateUserIsSuperUser(userId);
        }

        const newCourse = await model.courses.openCourse(courseId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/close', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        const course = await model.courses.get(courseId);
        try {
            helpersUtils.validateUserIsCourseAdmin(course, userId);
        }
        catch (error) {
            await validateUserIsSuperUser(userId);
        }

        const newCourse = await model.courses.closeCourse(courseId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/addAdmin', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const recipientId = req.body.recipientId;

    try {
        await validateUserIsSuperUser(userId);
        await model.accounts.addAdminApproved(recipientId, courseId);
        await model.accounts.removeAdminPending(recipientId, courseId);
        const newCourse = await model.courses.addAdmin(courseId, recipientId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.put('/removeAdmin', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const recipientId = req.body.recipientId;

    try {
        await validateUserIsSuperUser(userId);
        await model.accounts.removeAdminApproved(recipientId, courseId);
        const newCourse = await model.courses.removeAdmin(courseId, recipientId);

        return res.json({
            success: true,
            data: {
                course: newCourse
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

routes.get('/search', async (req, res) => {
    const nameString = req.query.name;

    try {
        validateNameSearch(nameString);
        const courses = await model.courses.search(nameString);

        return res.json({
            success: true,
            data: {
                courses: courses
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

routes.get('/byTags', async (req, res) => {
    const tags = req.query.tags;

    try {
        validateTags(tags);

        const courses = await model.courses.getByTags(tags);

        return res.json({
            success: true,
            data: {
                courses: courses
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
    const courseId = req.body.courseId;
    const title = req.body.title;
    const description = req.body.description;

    try {
        helpersUtils.validateReviewTitle(title);
        helpersUtils.validateReviewDescription(description);

        const course = await model.courses.get(courseId);
        helpersUtils.validatePupilIsCourseParticipate(course, userId);
        const user = await model.accounts.get(userId);
        const review = await model.reviews.create(userId, undefined, courseId, user.name, course.name, title, description, true);
        await model.courses.addReview(courseId, review._id);

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

routes.get('/reviews', authenticateMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.query.courseId;

    try {
        const course = await model.courses.get(courseId);
        try {
            helpersUtils.validateUserIsCourseAdmin(course, userId);
        }
        catch (error) {
            await validateUserIsSuperUser(userId);
        }

        const reviews = await model.reviews.getMultiple(course.reviews);

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


function validatePostContent(content) {
    if(!content || content.length < 3)
        throw errors.posts.invalidContent;
}

function validateNameSearch(name) {
    if (name.length < 3)
        throw errors.accounts.invalidName;
}

function validateCourseName(name) {
    if (name.length < 3)
        throw errors.courses.invalidName;
}

function validateCourseDescription(description) {
    if (description.length < 3)
        throw errors.courses.invalidDescription;
}

function validateCourseCoreFileLink(coreFileLink) {
    if (coreFileLink.length < 1)
        throw errors.courses.invalidCoreFileLink;
}

function formatCourseDate(date) {
    try {
        return new Date(date);
    }
    catch (error) {
        console.log(`courses api error - ${error}`);
        throw errors.courses.invalidDates;
    }
}

async function validateUserIsSuperUser(userId) {
    const user = await model.accounts.get(userId);

    if (!user.isSuperUser)
        throw errors.api.accessDenied;
}

function validateTags(tagsArray = []) {
    if (!tagsArray || tagsArray.length === 0)
        throw errors.courses.invalidTags;

    tagsArray.forEach((element) => {
        if (!courseTags[element])
            throw errors.courses.invalidTags;
    });
}

let router = Router();
router.use('/courses', routes);
export default router;