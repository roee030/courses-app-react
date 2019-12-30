import { useHistory } from "react-router-dom";
import { element } from "prop-types";
import * as serverApi from './server_api';
import actions from '../store/actions';

export function route(path = '') {
    // useHistory().push(path);
}

export function getUnSavedArrayElements(array = [], state = {}) {
    return array.filter(element => !state[element]);
}

export function getValuesFromStateByArray(state = {}, array = []) {
    const resultArray = array.map(element => state[element]);
    return resultArray.filter(element => element !== undefined);
}

export function getCourses(coursesIds = [], courses, dispatchCourses) {
    const notExistsCoursesIds = [];
    const existsCourses = [];
    coursesIds.forEach(courseId => { 
        if (courses[courseId])
            existsCourses.push(courses[courseId]);

        notExistsCoursesIds.push(courseId);
    });
    
    if (notExistsCoursesIds.length) {
        serverApi.get('courses/multiple', { coursesIds: notExistsCoursesIds }, res => {
            const data = res ? res.data : undefined;
    
            if (data && data.courses)
                dispatchCourses(actions.courses.addCourses(data.courses));
        });
    }

    return existsCourses;
}

export function getReviews(isMine = false, setReviews, userId, courseId) {
    if (isMine) {
        serverApi.get('users/myReviews', {}, res => {
            const data = res ? res.data : undefined;
        
            if (data && data.reviews)
                setReviews(data.reviews);
        });
    }
    else {
        serverApi.get('reviews/multiple', { courseId: courseId, pupilId: userId }, res => {
            const data = res ? res.data : undefined;
    
            if (data && data.reviews)
                setReviews(data.reviews);
        });
    }
}