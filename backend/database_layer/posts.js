import * as mongoLib from '../libraries/mongodb';

const tableName = 'posts';

export async function create(postObj) {
    const collection = await mongoLib.ensureTable(tableName);
    const doc = await collection.insertOne(postObj);

    return ((doc && doc.ops) ? doc.ops[0] : null);
}

export async function get(id) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredId = mongoLib.ensureObjectId(id);

    return collection.findOne({ _id: ensuredId });
}

export async function getMultiple(ids, skip = 0, limit = 10) {
    const collection = await mongoLib.ensureTable(tableName);
    const ensuredIds = mongoLib.ensureObjectIdArray(ids);

    const result = await collection.find({ _id: { $in: ensuredIds }}).skip(skip).limit(limit);
    return result.toArray();
}