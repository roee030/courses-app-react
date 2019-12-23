import React from 'react'
import LoginForm from './LoginForm'
import './css/PopUp.css';

export default function LoginPopUp({ dispatchMyUser, setPopUp }) {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true" onClick={() => setPopUp( null )}>×</span>
                </button>
                <LoginForm dispatchMyUser={dispatchMyUser} setPopUp={setPopUp}/>
                <div className="text-center" onClick={()=>{
                    setPopUp( "register" )}}>
                    <a >Create an account</a>
                </div>
                <div onClick={() => { setPopUp( "reset" ) }} className="text-center">
                    <a >Lost your password? Reset user password</a>
                </div>
            </div>
        </div>
    )
}
