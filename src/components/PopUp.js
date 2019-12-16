import React from 'react';
import './css/PopUp.css';
import Register from '../pages/Register'
import Login from '../pages/Sign-in'
import ResetPassword from '../pages/ResetPassword'
function PopUp(props) {
    
    
    switch(props.popUp)
    {
        case("login"):
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
        case("register"):
        return(
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
        case("reset"):
        return(
            <div className="popup">
                <div className="popup_inner">
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={()=>props.setPopUp( null )}>×</span>
                    </button>
                    <ResetPassword/>
                </div>
            </div>
        )
    }

}



export default PopUp;