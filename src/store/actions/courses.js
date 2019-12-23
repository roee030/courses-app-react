export const ACTION_NAMES = {
    ADD_COURSE: 'ADD_COURSE',
    ADD_COURSES: 'ADD_COURSES',
    ADD_PENDING_REQUEST: 'ADD_PENDING_REQUEST',
    REMOVE_PENDING_REQUEST: 'REMOVE_PENDING_REQUEST',
    ADD_ADMIN_ID: 'ADD_ADMIN_ID',
    REMOVE_ADMIN_ID: 'REMOVE_ADMIN_ID',
    ADD_PARTICIPATE_ID: 'ADD_PARTICIPATE_ID',
    REMOVE_PARTICIPATE_ID: 'REMOVE_PARTICIPATE_ID',
    ADD_POST: 'ADD_POST',
    ADD_POSTS: 'ADD_POSTS',
    ADD_POST_ID: 'ADD_POST_ID',
    REMOVE_POST_ID: 'REMOVE_POST_ID',
    ADD_REVIEW: 'ADD_REVIEW',
    ADD_REVIEWS: 'ADD_REVIEWS',
    ADD_REVIEW_ID: 'ADD_REVIEW_ID',
    REMOVE_REVIEW_ID: 'REMOVE_REVIEW_ID',
    ADD_SUBCOURSE_ID: 'ADD_SUBCOURSE_ID',
    REMOVE_SUBCOURSE_ID: 'REMOVE_SUBCOURSE_ID'
}

export function addCourse(course) {
    return { type: ACTION_NAMES.ADD_COURSE, course };
}

export function addCourses(courses) {
    return { type: ACTION_NAMES.ADD_COURSE, courses };
}

export function addPendingRequest(courseId, userId) {
    return { type: ACTION_NAMES.ADD_PENDING_REQUEST, id: courseId, userId: userId };
}

export function removePendingRequest(courseId, userId) {
    return { type: ACTION_NAMES.REMOVE_PENDING_REQUEST, id: courseId, userId: userId };
}

export function addAdminId(courseId, userId) {
    return { type: ACTION_NAMES.ADD_ADMIN_ID, id: courseId, userId: userId };
}

export function removeAdminId(courseId, userId) {
    return { type: ACTION_NAMES.REMOVE_ADMIN_ID, id: courseId, userId: userId };
}

export function addParticipateId(courseId, userId) {
    return { type: ACTION_NAMES.ADD_PARTICIPATE_ID, id: courseId, userId: userId };
}

export function removeParticipateId(courseId, userId) {
    return { type: ACTION_NAMES.REMOVE_PARTICIPATE_ID, id: courseId, userId: userId };
}

export function addPostId(courseId, postId) {
    return { type: ACTION_NAMES.ADD_POST_ID, id: courseId, postId: postId };
}

export function removePostId(courseId, postId) {
    return { type: ACTION_NAMES.REMOVE_POST_ID, id: courseId, postId: postId };
}

export function addPost(post) {
    return { type: ACTION_NAMES.ADD_POST, id: post._id, post: post };
}

export function addPosts(posts) {
    return { type: ACTION_NAMES.ADD_POST, posts };
}

export function addReviewId(courseId, reviewId) {
    return { type: ACTION_NAMES.ADD_REVIEW_ID, id: courseId, reviewId: reviewId };
}

export function removeReviewId(courseId, reviewId) {
    return { type: ACTION_NAMES.REMOVE_REVIEW_ID, id: courseId, reviewId: reviewId };
}

export function addReview(review) {
    return { type: ACTION_NAMES.ADD_REVIEW, id: review._id, review: review };
}

export function addReviews(reviews) {
    return { type: ACTION_NAMES.ADD_REVIEW, reviews };
}

export function addSubCourseId(courseId, subCourseId) {
    return { type: ACTION_NAMES.ADD_SUBCOURSE_ID, id: courseId, subCourseId: subCourseId };
}

export function removeSubCourseId(courseId, subCourseId) {
    return { type: ACTION_NAMES.REMOVE_SUBCOURSE_ID, id: courseId, subCourseId: subCourseId };
}