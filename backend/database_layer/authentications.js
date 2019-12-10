import * as mongoLib from '../libraries/mongodb';

const tableName = 'authentications';

export async function init() {
    const collection = await mongoLib.ensureTable(tableName);
    await collection.createIndex({ personalNumber: 1 });
}

export async function create(authObj) {
    const collection = await mongoLib.ensureTable(tableName);
    const doc = await collection.insertOne(authObj);

    return ((doc && doc.ops) ? doc.ops[0] : null);
}

export async function getByPersonalNumber(personalNumber) {
    const collection = await mongoLib.ensureTable(tableName);
    return collection.findOne({ personalNumber: personalNumber });
}

export async function updatePassword(authId, password) {
    const collection = await mongoLib.ensureTable(tableName);
    const id = mongoLib.ensureObjectId(authId);
    await collection.updateOne({ _id: id }, { $set: { password: password } });
    return collection.findOne({ _id: id });
}