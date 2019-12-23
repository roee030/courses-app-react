export const ACTION_NAMES = {
    ADD_USER: 'ADD_USER',
    ADD_USERS: 'ADD_USERS',
    ADD_MY_USER: 'ADD_MY_USER',
    ADD_PARTICIPATE_PENDING: 'ADD_PARTICIPATE_PENDING',
    ADD_MY_PARTICIPATE_PENDING: 'ADD_MY_PARTICIPATE_PENDING',
    REMOVE_PARTICIPATE_PENDING: 'REMOVE_PARTICIPATE_PENDING',
    REMOVE_MY_PARTICIPATE_PENDING: 'REMOVE_MY_PARTICIPATE_PENDING',
    ADD_PARTICIPATE_APPROVED: 'ADD_PARTICIPATE_APPROVED',
    REMOVE_PARTICIPATE_APPROVED: 'REMOVE_PARTICIPATE_APPROVED'
}

export function addUser(user) {
    return { type: ACTION_NAMES.ADD_USER, user: user };
}

export function addUsers(users) {
    return { type: ACTION_NAMES.ADD_USERS, users: users };
}

export function addMyUser(user) {
    return { type: ACTION_NAMES.ADD_MY_USER, user: user };
}

export function addParticipatePending(userId, courseId) {
    return { type: ACTION_NAMES.ADD_PARTICIPATE_PENDING, id: userId, courseId: courseId };
}

export function addMyParticipatePending(courseId) {
    return { type: ACTION_NAMES.ADD_MY_PARTICIPATE_PENDING, courseId: courseId };
}

export function addParticipateApproved(userId, courseId) {
    return { type: ACTION_NAMES.ADD_PARTICIPATE_APPROVED, id: userId, courseId: courseId };
}

export function removeParticipatePending(userId, courseId) {
    return { type: ACTION_NAMES.REMOVE_PARTICIPATE_PENDING, id: userId, courseId: courseId };
}

export function removeMyParticipatePending(courseId) {
    return { type: ACTION_NAMES.REMOVE_MY_PARTICIPATE_PENDING, courseId: courseId };
}

export function removeParticipateApproved(userId, courseId) {
    return { type: ACTION_NAMES.REMOVE_PARTICIPATE_APPROVED, id: userId, courseId: courseId };
}
