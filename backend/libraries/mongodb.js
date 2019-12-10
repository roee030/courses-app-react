import MongoClient, { ObjectID } from 'mongodb';
import * as config from '../config';

const largeDB = false;
const poolSize = 5;
let client;
let db;

export async function connect() {
    if (db) {
        console.log(`${config.getDbName()} - connection already exists`);
        return db;
    }

    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAliveInitialDelay: 10000,
        poolSize: poolSize,
        w: largeDB ? 2 : 1
    };
    try {
        const dbStringUrl = config.getMongoDBConnectionString();
        client = await MongoClient.connect(dbStringUrl, dbOptions);
        const dbName = config.getDbName();
        db = client.db(dbName);
        
        console.log(`${config.getDbName()} - connected!`);
        
        return db;
    }
    catch (error) {
        console.log(`${config.getDbName()} - connection error!!!`);
        throw error;
    }
}

export async function disconnect() {
    if (!db)
        return;
    try {
        await client.close();
        client = undefined;
        db = undefined;
        console.log(`${config.getDbName()} - connection closed!`);
    }
    catch (error) {
        console.log(`${config.getDbName()} - error dosconnecting!!!`);
        client = undefined;
        db = undefined;
        throw error;
    }
}

export async function ensureTable(tableName) {
    return db.collection(tableName);
}

export async function ensureObjectId(id) {
    if (!id)
        return;

    if (id instanceof ObjectID)
        return id;

    return new ObjectID(String(id));
}


export async function ensureObjectIdArray(array) {
    return Promise.all(_.map(array, ((id) => {
        return ensureObjectId(id);
    })));
}