import * as mongodbUtils from '../libraries/mongodb';
import * as accounts from './accounts';
import * as authentications from './authentications';
import * as courses from './courses';
import * as reviews from './reviews';
import * as posts from './posts';

export default {
    accounts,
    authentications,
    courses,
    reviews,
    posts,
    init,
    deinit
}

async function init() {
    await mongodbUtils.connect();
    await accounts.init();
    await authentications.init();
    await courses.init();
    await reviews.init();
}

async function deinit() {
    await mongodbUtils.disconnect();
}