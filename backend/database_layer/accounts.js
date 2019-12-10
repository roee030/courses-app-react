import * as mongoLib from '../libraries/mongodb';

const tableName = 'accounts';

export async function init() {
    const collection = await mongoLib.ensureTable(tableName);
    await collection.createIndex({ name: "text" });
    await collection.createIndex({ personalNumber: 1 });
}

export async function create(accountObj) {
    const collection = await mongoLib.ensureTable(tableName);
    const doc = await collection.insertOne(accountObj);

    return ((doc && doc.ops) ? doc.ops[0] : null);
}

export async function getMultiple(ids, skip = 0, limit = 10) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredIds = mongoLib.ensureObjectIdArray(ids);

    const result = await collection.find({ _id: { $in: ensuredIds }}).skip(skip).limit(limit);
    return result.toArray();
}

export async function get(id) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    return collection.findOne({ _id: ensuredId });
}

export async function getByPersonalNumber(personalNumber) {
    const collection = await mongoLib.ensureTable(tableName);

    return collection.findOne({ personalNumber: personalNumber });
}

export async function addParticipatePending(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'courses.participate.pending': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function addParticipateApproved(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'courses.participate.approved': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function addAdminApproved(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'courses.admin.approved': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeAdminApproved(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $pull: { 'courses.admin.approved': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeAdminPending(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $pull: { 'courses.admin.pending': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeParticipatePending(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $pull: { 'courses.participate.pending': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeParticipateApproved(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $pull: { 'courses.participate.approved': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function search(name) {
    const collection = await mongoLib.ensureTable(tableName);

    const result = await collection.find({ $text: { $search: name }}, { score: { $meta: "textScore" }}).sort({ score: { $meta: "textScore" }});
    return result.toArray();
}