import React, { useContext, useReducer } from 'react';
import AppContext from '../../../helpers/AppContext';
import MainCourseLink from '../presentials/MainCourseLink';
import DatesOrSubCourses from './DatesOrSubCourses';
import MembersGrid from '../../../components/MembersGrid';
import CancelOrRequestToJoinButton from '../presentials/CancelOrRequestToJoinButton';
import reducers from '../../../reducers';
import actions from '../../../actions';
import * as serverApi from '../../../helpers/server_api';

export default function OutsiderCourse({ courseId, subCourses = [], admins = [], onMemberClick }) {
    const context = useContext(AppContext);
    const [myUser, dispatchMyUser] = useReducer(reducers.users.updateUsers, context.myUser);
    const [courses, dispatchCourses] = useReducer(reducers.courses.updateCourses, context.courses);
    const course = courses[courseId];
    const pendingRequestsIds = course.pendingRequests || [];
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;

    const isPending =  pendingRequestsIds.includes(myUser._id);

    const membersGrid = [{
        title: 'admins',
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: admins,
        memberFunc: onMemberClick
    }];

    return (    
        <div id='mainContainer'>
            <div id='contentContainer'>
                <div id='courseDataContainer'>
                    <div id='title'>
                        {course.name}
                    </div>
                    <div id='description'>
                        {course.description}
                    </div>
                    <div>
                        <MainCourseLink mainCourseId={course.mainCourseId} />
                        <DatesOrSubCourses subCourses={subCourses} fromDate={fromDate} toDate={toDate} />
                    </div>
                    <div>
                        {course.isOpen ? <CancelOrRequestToJoinButton isPending={isPending} onCancelRequestButtonClick={onCancelRequestButtonClick} onRequestButtonClick={onRequestButtonClick} /> : undefined}
                    </div>
                </div>
                <div>
                    <MembersGrid members={membersGrid}/>
                </div>
            </div>
        </div>
    )

    function onCancelRequestButtonClick() {
        serverApi.put('courses/cancelRequest', { courseId: courseId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.success) {
                dispatchCourses(actions.courses.removePendingRequest(courseId, myUser._id));
                dispatchMyUser(actions.users.addMyParticipatePending(courseId));
            }
        });
    }

    function onRequestButtonClick() {
        serverApi.put('courses/request', { courseId: courseId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.success) {
                dispatchCourses(actions.courses.addPendingRequest(courseId, myUser._id))
                dispatchMyUser(actions.users.removeMyParticipatePending(courseId));
            }
        });
    }
}