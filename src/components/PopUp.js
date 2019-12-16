import React from 'react';
import './css/PopUp.css';
import Register from '../pages/Register'
import Login from '../pages/Sign-in'
import ResetPassword from '../pages/ResetPassword'
function PopUp(props) {
    
    
    switch(props.type)
    {
        case("login"):
        return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={()=>props.setShowLoginPopUp(!props.showLoginPopUp)}>×</span>
                        </button>
                        <Login/>
                        <div className="text-center">
                            <a >Create an account</a>
                        </div>
                        <div onClick={()=>{props.setType("reset");
                            }
                            }className="text-center">
                            Lost your password? Reset user password
                        </div>
                    </div>
                </div>
        )
        case("register"):
        return(
                <div className='popup'>
                    <div className='popup_inner'>
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={()=>{props.setShowRegisterPopUp(!props.showRegisterPopUp)
                        }}>×</span>
                    </button>
                    <Register/>
                    <div onClick={()=>{
                        props.setType("login");
                        console.log(props.type);
                        }} className="text-center">
                        I have an account, let me login...
                    </div>
                    </div>
                </div>
            )
        case("reset"):
        return(
            <div className="popup">
                <div className="popup_inner">
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <ResetPassword/>
                </div>
            </div>
        )
    }

}
export default PopUp;