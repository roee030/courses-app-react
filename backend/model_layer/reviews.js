import dbLayer from '../database_layer';
import errors from '../errors';

export async function getPublicByPupilId(userId) {
    return dbLayer.reviews.getPublicByPupilId(userId);
}

export async function create(writerId, pupilId, courseId, writerName, courseName, title, description, isCourseReview = false, isPublic = false) {
    const review = {
        writerId: writerId,
        pupilId: pupilId,
        courseId: courseId,
        writerName: writerName,
        courseName: courseName,
        title: title,
        description: description,
        isCourseReview: isCourseReview,
        isPublic: isPublic,
        createdAt: new Date()
    };

    return dbLayer.reviews.create(review);
}

export async function getByPupilId(userId) {
    return dbLayer.reviews.getByPupilId(userId);
}

export async function getMultiple(ids) {
    const totalReviews = [];
    const limit = 20;
    let skip = 0;
    let hasNext = true;

    if (!ids || ids.length === 0)
        return [];

    while (hasNext) {
        const result = await dbLayer.reviews.getMultiple(ids.slice(skip, skip + limit));

        if (result.length < limit)
            hasNext = false;

        skip += limit;
        totalReviews.push(...result);
    }

    return totalReviews;
}