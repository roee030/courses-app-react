import React from 'react'
import Login from '../pages/Sign-in'
import './css/PopUp.css';

export default function LoginPopUp(props) {
    return (
        <div className='popup'>
                    <div className='popup_inner'>
                        <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={()=>props.setPopUp( null )}>×</span>
                        </button>
                        <Login/>
                        <div className="text-center" onClick={()=>{
                            props.setPopUp( "register" )}}>
                            <a >Create an account</a>
                        </div>
                        <div onClick={()=>{
                            props.setPopUp( "reset" )
                            }
                            }className="text-center">
                            <a >Lost your password? Reset user password</a>
                        </div>
                    </div>
                </div>
    )
}
