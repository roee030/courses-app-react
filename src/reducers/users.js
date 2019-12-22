import actions from '../actions';

const USER_ACTIONS = actions.users.ACTION_NAMES;

export function updateMyUser(currentState, action) {
    switch (action.type) {
        case USER_ACTIONS.ADD_MY_USER:
            return action.user;
        case USER_ACTIONS.ADD_MY_PARTICIPATE_PENDING:
            const addParicipatePendingUser = {...currentState};
            addParicipatePendingUser.courses.participate.pending.push(action.courseId);
            return addParicipatePendingUser;
        case USER_ACTIONS.REMOVE_MY_PARTICIPATE_PENDING:
            const removeParicipatePendingUser = {...currentState};
            removeParicipatePendingUser.courses.participate.pending.filter(id => id !== action.courseId);
            return removeParicipatePendingUser;
        default:
            throw 'wrong action type';
    }

}

export function updateUsers(currentState, action) {
    switch (action.type) {
        case USER_ACTIONS.ADD_USER:
            return { ...currentState, [action.user._id]: action.user };
        case USER_ACTIONS.ADD_USERS:
            const addUsersObj = {};
            action.users.forEach(element => {
                addUsersObj[element._id] = element;
            });
            return { ...currentState, ...addUsersObj};
        case USER_ACTIONS.ADD_PARTICIPATE_PENDING:
            const addParicipatePendingUser = {...currentState}[action.id];
            addParicipatePendingUser.courses.participate.pending.push(action.courseId);
            return addParicipatePendingUser;
        case USER_ACTIONS.ADD_PARTICIPATE_APPROVE:
            const addParicipateApproveUser = {...currentState}[action.id];
            addParicipateApproveUser.courses.participate.approve.push(action.courseId);
            return addParicipateApproveUser;
        case USER_ACTIONS.REMOVE_PARTICIPATE_PENDING:
            const removeParicipatePendingUser = {...currentState}[action.id];
            removeParicipatePendingUser.courses.participate.pending.filter(id => id !== action.courseId);
            return removeParicipatePendingUser;
        case USER_ACTIONS.REMOVE_PARTICIPATE_APPROVE:
            const removeParicipateApproveUser = {...currentState}[action.id];
            removeParicipateApproveUser.courses.participate.approve.filter(id => id !== action.courseId);
            return removeParicipateApproveUser;
        default:
            throw 'wrong action type';
    }
}