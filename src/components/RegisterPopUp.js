import React from 'react'
import './css/PopUp.css';
import Register from './Register'
export default function RegisterPopUp(props) {
    return (
        <div className='popup'>
        <div className='popup_inner'>
        <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true" onClick={()=>props.setPopUp( null )}>×</span>
        </button>
        <Register/>
        <div onClick={()=>{
            props.setPopUp( "login" )}
            } className="text-center">
            <a >I have an account, let me login...</a>
        </div>
        </div>
    </div>
    )
}
