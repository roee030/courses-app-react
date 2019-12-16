import React from 'react'
import Reset from '../pages/ResetPassword'
import './css/PopUp.css';
import ResetPassword from '../pages/ResetPassword';
export default function ResetPopUp(props) {
    return (
        <div className='popup'>
        <div className='popup_inner'>
            <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true" onClick={()=>props.setPopUp( null )}>×</span>
            </button>
            <ResetPassword/>
            <div className="text-center" onClick={()=>{
                props.setPopUp( "login" )}}>
                <a >Log in</a>
            </div>
        </div>
    </div>
    )
}
