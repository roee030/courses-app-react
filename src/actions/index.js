// Actions
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const ADD_COURSE = "ADD_COURSE";
export const EDIT_COURSE = "EDIT_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";


// Action creators
export function addUser(user) {
    return { type: ADD_USER, user };
}

export function removeUser(_id) {
    return { type: REMOVE_USER, _id };
}

export function editUser(user) {
    return { type: EDIT_USER, user };
}
export function addCourse(course) {
    return { type: ADD_COURSE, course };
}

export function removeCourse(_id) {
    return { type: REMOVE_COURSE, _id };
}

export function editCourse(course) {
    return { type: EDIT_COURSE, course };
}
