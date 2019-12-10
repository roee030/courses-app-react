import dbLayer from '../database_layer';
import errors from '../errors';

export async function create(userId, userName, courseId, courseName, content) {
    const post = {
        writerId: userId,
        writerName: userName,
        courseId: courseId,
        courseName: courseName,
        content: content,
        createdAt: new Date()
    };

    return dbLayer.posts.create(post);
}

export async function get(postId) {
    return dbLayer.posts.get(postId);
}

export async function getMultiple(ids) {
    const totalPosts = [];
    const limit = 20;
    let skip = 0;
    let hasNext = true;

    if (!ids || ids.length === 0)
        return [];

    while (hasNext) {
        const result = await dbLayer.posts.getMultiple(ids.slice(skip, skip + limit));

        if (result.length < limit)
            hasNext = false;

        skip += limit;
        totalPosts.push(...result);
    }

    return totalPosts;
}