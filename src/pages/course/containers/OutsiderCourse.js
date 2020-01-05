import React, { useState } from 'react';
import MainCourseLink from '../presentials/MainCourseLink';
import DatesOrSubCourses from './DatesOrSubCourses';
import MembersGrid from '../../user/presentials/MembersGrid';
import CancelOrRequestToJoinButton from '../presentials/CancelOrRequestToJoinButton';
import * as serverApi from '../../../helpers/server_api';

export default function OutsiderCourse({ course, myUser, subCourses = [], admins = [] }) {
    const [pendingRequestsIds, setPendingRequestsIds] = useState(course.pendingRequests || []);
    const fromDate = course.dates.from ? new Date(course.dates.from).toDateString() : undefined;
    const toDate = course.dates.to ? new Date(course.dates.to).toDateString() : undefined;

    const isPending =  pendingRequestsIds.includes(myUser._id);

    const membersGrid = [{
        title: 'admins',
        isRemoveEnabled: false,
        isAddEnabled: false,
        list: admins
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

    function onCancelRequestButtonClick(courseId) {
        serverApi.put('courses/cancelRequest', { courseId: courseId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.success) {
                const newPending =  [...pendingRequestsIds].push(myUser._id);
                setPendingRequestsIds(newPending);
            }
        });
    }

    function onRequestButtonClick(courseId) {
        serverApi.put('courses/request', { courseId: courseId }, res => {
            const data = res ? res.data : undefined;

            if (data && data.success) {
                const newPending =  [...pendingRequestsIds].filter(id => id !== myUser._id);
                setPendingRequestsIds(newPending);
            }
        });
    }
}