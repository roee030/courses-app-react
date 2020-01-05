import React, { useState } from 'react'
import '../../../components/css/PopUp.css';
import { MDBBtn } from 'mdbreact';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Title from '../../../components/Title';
import * as serverApi from '../../../helpers/server_api';


export default function ReviewPopUp({ course = undefined, setCourse = undefined, courseId = undefined, setPopUp, reviews = [], setReviews, isCourseReview = true, pupilId = undefined }) {
    const [btnEnabled, setBtnEnabled] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    console.log('axaxaxax');
    console.log(isPublic);
    

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true" onClick={() => setPopUp(null)}>×</span>
                </button>
                <Title title={"Review"}/>
                <input className="form-control my-0 py-1" type="text" placeholder="Add review title" aria-label="Search" onChange={e => {onTitleType(e.target.value)}} />
                <input className="form-control my-0 py-1" type="text" placeholder="Add review text" aria-label="Search" onChange={e => {onTextType(e.target.value)}} />
                <MDBBtn disabled={!btnEnabled} style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}} onClick={review} >Post</MDBBtn>
                {!isCourseReview ? (<FormControlLabel control={<Checkbox value="checkedC" onSelect={() => {setIsPublic(true)}} onEmptied={() => {setIsPublic(false)}} />} label="Uncontrolled" />) : null}
            </div>
        </div>
    )

    function onTitleType(inputTitle = '') {
        setTitle(inputTitle);

        if (inputTitle.length && text.length)
            setBtnEnabled(true);
        else
            setBtnEnabled(false);
    }

    function onTextType(inputText = '') {
        setText(inputText);

        if (title.length && inputText.length)
            setBtnEnabled(true);
        else
            setBtnEnabled(false);
    }

    function review(isCourseReview) {
        setBtnEnabled(false);
        
        isCourseReview ? courseReview() : pupilReview();
    }

    function courseReview() {
        serverApi.post('courses/review', { courseId: course._id, title: title, description: text }, res => {
            const data = res ? res.data : undefined;
            if (data && data.review) {
                const newReviews = [...reviews];
                newReviews.push(data.review);
                setReviews(newReviews);

                const newCourse = {...course};
                newCourse.reviews.push(data.review._id);
                setCourse(newCourse);
                setPopUp(null);
            }
            else {
                setBtnEnabled(true);
            }
        });
    }

    function pupilReview() {
        serverApi.post('users/review', { courseId: course._id, pupilId: pupilId, isPublic: isPublic, title: title, description: text }, res => {
            const data = res ? res.data : undefined;
            if (data && data.review) {
                const newReviews = [...reviews];
                newReviews.push(data.review);
                setReviews(newReviews);
                setPopUp(null);
            }
            else {
                setBtnEnabled(true);
            }
        });
    }
}

