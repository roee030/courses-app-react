let isTest = false;

export function setTestEnv(isTestEnv) {
    isTest = isTestEnv;
}

export function getDbName() {
    return isTest ? 'bhdCourses-test' : 'bhdCourses';
}

export function getMongoDBConnectionString() {
    if (process.env.MONGODB_URL)
        return process.env.MONGODB_URL;

    const dbName = getDbName();
    
    return `mongodb://localhost:27017/${dbName}`;
}

export function getAuthTokenSecret() {
    return process.env.AUTH_TOKEN_SECRET || 'testtesttesttest';
}