import dbLayer from '../database_layer';
import errors from '../errors';

export async function createUser(name, personalNumber, phoneNumber, birthDate) {
    const account = {
        name: name,
        personalNumber: personalNumber,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        courses: {
            admin: {
                approved: [],
                pending: []
            },
            participate: {
                approved: [],
                pending: []
            }
        },
        createdAt: new Date()
    };

    return dbLayer.accounts.create(account);
}

export async function getMultiple(ids) {
    const totalUsers = [];
    const limit = 20;
    let skip = 0;
    let hasNext = true;

    if (!ids || ids.length === 0)
        return [];

    while (hasNext) {
        const result = await dbLayer.accounts.getMultiple(ids.slice(skip, skip + limit));

        if (result.length < limit)
            hasNext = false;

        skip += limit;
        totalUsers.push(...result);
    }

    return totalUsers;
}

export async function getUserByPersonalNumber(personalNumber) {
    return dbLayer.accounts.getByPersonalNumber(personalNumber);
}

export async function get(userId) {
    return dbLayer.accounts.get(userId);
}

export async function getAuthenticationByPersonalNumber(personalNumber) {
    return dbLayer.authentications.getByPersonalNumber(personalNumber);
}

export async function createAuthentication(personalNumber, idNumber, hogerNumber, userId, password) {
    const auth = {
        personalNumber: personalNumber,
        idNumber: idNumber,
        hogerNumber: hogerNumber,
        userId: userId,
        passwordBuffer: encodePassword(password),
        createdAt: new Date()
    };

    return dbLayer.authentications.create(auth);
}

export async function validateAuthentication(personalNumber, password) {
    const auth = await dbLayer.authentications.getByPersonalNumber(personalNumber);

    if (!auth)
        return false;

    const decodedAuthPass = decodePassword(auth.password);
    const decodedPass = decodePassword(password);

    return decodedAuthPass === decodedPass;
}

export async function validateResetPasswordParams(personalNumber, idNumber, hogerNumber) {
    const auth = await dbLayer.authentications.getByPersonalNumber(personalNumber);

    if (!auth)
        throw errors.accounts.userNotExist;

    if (auth.idNumber !== idNumber || auth.hogerNumber !== hogerNumber)
        throw errors.accounts.paramsNotMatch;

    return auth;
}

export async function updatePassword(authId, password) {
    const auth = await dbLayer.authentications.updatePassword(authId, password);
    return dbLayer.accounts.get(auth.userId);
}

export async function addParticipatePending(userId, courseId) {
    return dbLayer.accounts.addParticipatePending(userId, courseId);
}

export async function addParticipateApproved(userId, courseId) {
    return dbLayer.accounts.addParticipateApproved(userId, courseId);
}

export async function addAdminApproved(userId, courseId) {
    return dbLayer.accounts.addAdminApproved(userId, courseId);
}

export async function removeAdminApproved(userId, courseId) {
    return dbLayer.accounts.removeAdminApproved(userId, courseId);
}

export async function removeAdminPending(userId, courseId) {
    return dbLayer.accounts.removeAdminPending(userId, courseId);
}

export async function removeParticipatePending(userId, courseId) {
    return dbLayer.accounts.removeParticipatePending(userId, courseId);
}

export async function removeParticipateApproved(userId, courseId) {
    return dbLayer.accounts.removeParticipateApproved(userId, courseId);
}

export async function search(name) {
    return dbLayer.accounts.search(name);
}

function encodePassword(password) {
    return Buffer.from(password, 'base64');
}

function decodePassword(buffer) {
    return buffer.toString('utf-8');
}