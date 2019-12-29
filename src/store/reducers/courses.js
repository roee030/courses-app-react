import actions from '../actions';

const COURSE_ACTIONS = actions.courses.ACTION_NAMES;

export function updatePosts(currentState, action) {
    switch (action.type) {
        case COURSE_ACTIONS.ADD_POST:
            return { ...currentState, [action.post._id]: action.post };
        case COURSE_ACTIONS.ADD_POSTS:
            const addPostsObj = {};
            action.posts.forEach(element => {
                addPostsObj[element._id] = element;
            });
            return { ...currentState, ...addPostsObj};
        default:
            throw 'wrong action type';
    }
}

export function updateReviews(currentState, action) {
    switch (action.type) {
        case COURSE_ACTIONS.ADD_REVIEW:
            return { ...currentState, [action.review._id]: action.review };
        case COURSE_ACTIONS.ADD_REVIEWS:
            const addReviewsObj = {};
            action.reviews.forEach(element => {
                addReviewsObj[element._id] = element;
            });
            return { ...currentState, ...addReviewsObj};
        default:
            throw 'wrong action type';
    }
}

export function updateCourses(currentState, action) {
    switch (action.type) {
        case COURSE_ACTIONS.ADD_COURSE:
            return { ...currentState, [action.course._id]: action.course };
        case COURSE_ACTIONS.ADD_COURSES:
            const addCoursesObj = {};
            action.courses.forEach(element => {
                addCoursesObj[element._id] = element;
            });
            return { ...currentState, ...addCoursesObj};
        case COURSE_ACTIONS.ADD_ADMIN_ID:
            const addAdminCourse = {...currentState}[action.id];
            addAdminCourse.admins.push(action.userId);
            return addAdminCourse;
        case COURSE_ACTIONS.ADD_PARTICIPATE_ID:
            const addParticipateCourse = {...currentState}[action.id];
            addParticipateCourse.participates.push(action.userId);
            return addParticipateCourse;
        case COURSE_ACTIONS.ADD_PENDING_REQUEST:
            const addPendingRequestCourse = {...currentState}[action.id];
            addPendingRequestCourse.pendingRequests.push(action.userId);
            return addPendingRequestCourse;
        case COURSE_ACTIONS.ADD_POST_ID:
            const addPostCourse = {...currentState}[action.id];
            addPostCourse.posts.push(action.postId);
            return addPostCourse;
        case COURSE_ACTIONS.ADD_REVIEW_ID:
            const addReviewCourse = {...currentState}[action.id];
            addReviewCourse.reviews.push(action.reviewId);
            return addReviewCourse;
        case COURSE_ACTIONS.ADD_SUBCOURSE_ID:
            const addSubCourse = {...currentState}[action.id];
            addSubCourse.subCourses.push(action.subCourseId);
            return addSubCourse;
        case COURSE_ACTIONS.REMOVE_ADMIN_ID:
            const removeAdminCourse = {...currentState}[action.id];
            removeAdminCourse.admins.filter(id => id !== action.userId);
            return removeAdminCourse;
        case COURSE_ACTIONS.REMOVE_PARTICIPATE_ID:
            const removeParticipateCourse = {...currentState}[action.id];
            removeParticipateCourse.filter(id => id !== action.userId);
            return removeParticipateCourse;
        case COURSE_ACTIONS.REMOVE_PENDING_REQUEST:
            const removePendingRequestCourse = {...currentState}[action.id];
            removePendingRequestCourse.pendingRequests.filter(id => id !== action.userId);
            return removePendingRequestCourse;
        case COURSE_ACTIONS.REMOVE_POST_ID:
            const removePostCourse = {...currentState}[action.id];
            removePostCourse.posts.filter(id => id !== action.postId);
            return removePostCourse;
        case COURSE_ACTIONS.REMOVE_REVIEW_ID:
            const removeReviewCourse = {...currentState}[action.id];
            removeReviewCourse.reviews.filter(id => id !== action.reviewId);
            return removeReviewCourse;
        case COURSE_ACTIONS.REMOVE_SUBCOURSE_ID:
            const removeSubCourse = {...currentState}[action.id];
            removeSubCourse.subCourses.filter(id => id !== action.subCourseId);
            return removeSubCourse;
        default:
            throw 'wrong action type';
    }
}