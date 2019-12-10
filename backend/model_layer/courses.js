import dbLayer from '../database_layer';
import errors from '../errors';

export async function getMultiple(ids) {
    const totalCourses = [];
    const limit = 20;
    let skip = 0;
    let hasNext = true;

    if (!ids || ids.length === 0)
        return [];

    while (hasNext) {
        const result = await dbLayer.courses.getMultiple(ids.slice(skip, skip + limit));

        if (result.length < limit)
            hasNext = false;

        skip += limit;
        totalCourses.push(...result);
    }

    return totalCourses;
}

export async function addPendingRequest(courseId, userId) {
    return dbLayer.courses.addPendingRequest(courseId, userId);
}

export async function get(courseId) {
    return dbLayer.courses.get(courseId);
}

export async function addAdmin(courseId, userId) {
    return dbLayer.courses.addAdmin(courseId, userId);
}

export async function addParticipate(courseId, userId) {
    return dbLayer.courses.addParticipate(courseId, userId);
}

export async function removeAdmin(courseId, userId) {
    return dbLayer.courses.removeAdmin(courseId, userId);
}

export async function removeParticipate(courseId, userId) {
    return dbLayer.courses.removeParticipate(courseId, userId);
}

export async function removePendingRequest(courseId, userId) {
    return dbLayer.courses.removePendingRequest(courseId, userId);
}

export async function removePost(courseId, postId) {
    return dbLayer.courses.removePost(courseId, postId);
}

export async function addPost(courseId, postId) {
    return dbLayer.courses.addPost(courseId, postId);
}

export async function addReview(courseId, reviewId) {
    return dbLayer.courses.addReview(courseId, reviewId);
}

export async function addSubCourse(mainCourseId, subCourseId) {
    return dbLayer.courses.addSubCourse(mainCourseId, subCourseId);
}

export async function removeSubCourse(mainCourseId, subCourseId) {
    return dbLayer.courses.removeSubCourse(mainCourseId, subCourseId);
}

export async function removeMainCourseId(courseId) {
    return dbLayer.courses.removeMainCourseId(courseId);
}

export async function create(name, description, coreFileLink, coreFileExpirationDate, fromDate, toDate, isCampus = true, tagsArray = [], mainCourseId = undefined, adminsArray = []) {
    const course = {
        name: name,
        description: description,
        coreFile: {
            link: coreFileLink,
            expireIn: coreFileExpirationDate
        },
        dates: {
            from: fromDate,
            to: toDate
        },
        admins: adminsArray,
        pendingRequests: [],
        participates: [],
        reviews: [],
        posts: [],
        tags: tagsArray,
        subCourses: [],
        mainCourseId: mainCourseId,
        isCampus: isCampus,
        isOpen: false,
        createdAt: new Date()
    };

    return dbLayer.courses.create(course);
}

export async function update(courseId, name, description, coreFileLink, coreFileExpirationDate, fromDate, toDate, isCampus) {
    const course = {};
    name ? course.name = name : undefined;
    description ? course.description = description : undefined;
    coreFileLink ? course.coreFile.link = coreFileLink : undefined;
    coreFileExpirationDate ? course.coreFile.expireIn = coreFileExpirationDate : undefined;
    fromDate ? course.dates.from = fromDate : undefined;
    toDate ? course.dates.to = toDate : undefined;
    isCampus === true || isCampus === false ? course.isCampus = isCampus : undefined;

    return dbLayer.courses.update(courseId, course);
}

export async function openCourse(courseId) {
    return dbLayer.courses.openCourse(courseId);
}

export async function closeCourse(courseId) {
    return dbLayer.courses.closeCourse(courseId);
}

export async function search(name) {
    return dbLayer.courses.search(name);
}
export async function getByTags(tagsArray) {
    return dbLayer.courses.getByTags(tagsArray);
}