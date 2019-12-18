import React from 'react'
import './css/PopUp.css';
import Title from './Title';
import { MDBBtn } from 'mdbreact';

export default function PostPopUp() {
    return (
        <div className='popup'>
                    <div className='popup_inner'>
                        {/*<button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={()=>props.setPopUp( null )}>×</span>
                        </button>*/}
                        <Title title={"Review"}/>
                        <input className="form-control my-0 py-1" type="text" placeholder="Add review" aria-label="Search"/>
                        <MDBBtn style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}}>Post</MDBBtn>
                            
                    </div>
                </div>
    )
}
