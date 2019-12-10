import * as mongoLib from '../libraries/mongodb';

const tableName = 'reviews';

export async function init() {
    const collection = await mongoLib.ensureTable(tableName);
    await collection.createIndex({ pupilId: 1 });
    await collection.createIndex({ pupilId: 1, isPublic: 1 });
}

export async function getPublicByPupilId(userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredPupilId = mongoLib.ensureObjectId(userId);

    const result = await collection.find({ pupilId: ensuredPupilId, isPublic: true });
    return result.toArray();
}

export async function getByPupilId(userId) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredPupilId = mongoLib.ensureObjectId(userId);

    const result = await collection.find({ pupilId: ensuredPupilId });
    return result.toArray();
}

export async function create(reviewObj) {
    const collection = await mongoLib.ensureTable(tableName);
    const doc = await collection.insertOne(reviewObj);

    return ((doc && doc.ops) ? doc.ops[0] : null);
}

export async function getMultiple(ids, skip = 0, limit = 10) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredIds = mongoLib.ensureObjectIdArray(ids);

    const result = await collection.find({ _id: { $in: ensuredIds }}).skip(skip).limit(limit);
    return result.toArray();
}