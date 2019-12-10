import * as mongoLib from '../libraries/mongodb';

const tableName = 'courses';

export async function init() {
    const collection = await mongoLib.ensureTable(tableName);
    await collection.createIndex({ name: "text" });
    await collection.createIndex({ tags: 1 });
}

export async function getMultiple(ids, skip = 0, limit = 10) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredIds = mongoLib.ensureObjectIdArray(ids);

    const result = await collection.find({ _id: { $in: ensuredIds }}).skip(skip).limit(limit);
    return result.toArray();
}

export async function addPendingRequest(id, userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredUserId = mongoLib.ensureObjectId(userId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'pendingRequests': ensuredUserId }});
    return collection.findOne({ _id: ensuredId });
}

export async function get(id) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    return collection.findOne({ _id: ensuredId });
}

export async function removeMainCourseId(id) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    await collection.update({ _id: ensuredId }, { $set: { 'mainCourseId': null }});
    return collection.findOne({ _id: ensuredId });
}

export async function openCourse(id) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    await collection.update({ _id: ensuredId }, { $set: { 'isOpen': true }});
    return collection.findOne({ _id: ensuredId });
}

export async function closeCourse(id) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    await collection.update({ _id: ensuredId }, { $set: { 'isOpen': false }});
    return collection.findOne({ _id: ensuredId });
}

export async function update(id, updateObj) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    await collection.update({ _id: ensuredId }, { $set: updateObj });
    return collection.findOne({ _id: ensuredId });
}

export async function addAdmin(id, userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredUserId = mongoLib.ensureObjectId(userId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'admins': ensuredUserId }});
    return collection.findOne({ _id: ensuredId });
}

export async function addPost(id, postId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredPostId = mongoLib.ensureObjectId(postId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'posts': ensuredPostId }});
    return collection.findOne({ _id: ensuredId });
}

export async function addParticipate(id, userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredUserId = mongoLib.ensureObjectId(userId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'participates': ensuredUserId }});
    return collection.findOne({ _id: ensuredId });
}

export async function addSubCourse(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'subCourses': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function addReview(id, reviewId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredReviewId = mongoLib.ensureObjectId(reviewId);

    await collection.update({ _id: ensuredId }, { $addToSet: { 'reviews': ensuredReviewId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeAdmin(id, userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredUserId = mongoLib.ensureObjectId(userId);

    await collection.update({ _id: ensuredId }, { $pull: { 'admins': ensuredUserId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeParticipate(id, userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredUserId = mongoLib.ensureObjectId(userId);

    await collection.update({ _id: ensuredId }, { $pull: { 'participates': ensuredUserId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removePendingRequest(id, userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredUserId = mongoLib.ensureObjectId(userId);

    await collection.update({ _id: ensuredId }, { $pull: { 'pendingRequests': ensuredUserId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removePost(id, postId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredPostId = mongoLib.ensureObjectId(postId);

    await collection.update({ _id: ensuredId }, { $pull: { 'posts': ensuredPostId }});
    return collection.findOne({ _id: ensuredId });
}

export async function removeSubCourse(id, courseId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);
    const ensuredCourseId = mongoLib.ensureObjectId(courseId);

    await collection.update({ _id: ensuredId }, { $pull: { 'subCourses': ensuredCourseId }});
    return collection.findOne({ _id: ensuredId });
}

export async function create(courseObj) {
    const collection = await mongoLib.ensureTable(tableName);
    const doc = await collection.insertOne(courseObj);

    return ((doc && doc.ops) ? doc.ops[0] : null);
}

export async function search(name) {
    const collection = await mongoLib.ensureTable(tableName);

    const result = await collection.find({ $text: { $search: name }}, { score: { $meta: "textScore" }}).sort({ score: { $meta: "textScore" }});
    return result.toArray();
}

export async function getByTags(tags) {
    const collection = await mongoLib.ensureTable(tableName);

    const result = await collection.find({ tags: { $all: tags }});
    return result.toArray();
}