import errors from '../errors';

export function validateReviewTitle(title) {
    if (!title || title.length < 3)
        throw errors.reviews.invalidTitle;
}

export function validateReviewDescription(description) {
    if (!description || description.length < 3)
        throw errors.reviews.invalidDescription;
}

export function validateUserIsCourseAdmin(course, userId) {
    let isContain = false;
    course.admins.forEach(element => {
        if (String(element) === String(userId))
            isContain = true;
    });

    if (!isContain)
        throw errors.api.accessDenied;
}

export function validatePupilIsCourseParticipate(course, userId) {
    let isContain = false;
    course.participates.forEach(element => {
        if (String(element) === String(userId))
            isContain = true;
    });

    if (!isContain)
        throw errors.api.accessDenied;
}