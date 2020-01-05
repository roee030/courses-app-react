import React, { useState } from 'react'
import '../../../components/css/PopUp.css';
import Title from '../../../components/Title';
import { MDBBtn } from 'mdbreact';
import * as serverApi from '../../../helpers/server_api';

export default function PostPopUp({ course, setCourse, setPopUp, posts = [], setPosts }) {
    const [text, setText] = useState('');
    const [btnEnabled, setBtnEnabled] = useState(false);

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true" onClick={() => setPopUp(null)}>×</span>
                </button>
                <Title title={"Add Post"}/>
                <input className="form-control my-0 py-1" type="text" placeholder="Add post" aria-label="Search" onChange={e => { updateText(e.target.value)}} />
                <MDBBtn disabled={!btnEnabled} style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}} onClick={post} >Post</MDBBtn>
            </div>
        </div>
    )

    function updateText(inputText = '') {
        setText(inputText);

        if (inputText.length)
            setBtnEnabled(true);
        else 
            setBtnEnabled(false);
    }

    function post() {
        setBtnEnabled(false);
        serverApi.post('courses/post', { courseId: course._id, content: text }, res => {
            const data = res ? res.data : undefined;
        
            if (data && data.post) {
                const newPosts = [...posts];
                newPosts.push(data.post);
                setPosts(newPosts);

                const newCourse = {...course};
                newCourse.posts.push(data.post._id);
                setCourse(newCourse);
                setPopUp(null);
            }
            else {
                setBtnEnabled(true);
            }
        });
    }
}
