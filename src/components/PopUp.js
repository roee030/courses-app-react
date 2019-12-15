import React from 'react';
import './css/PopUp.css';
import Register from '../pages/Register'
import Login from '../pages/Sign-in'
import ResetPassword from '../pages/ResetPassword'
function PopUp(props) {
    

    console.log("------");
    
    console.log(props.type);
    
    switch(props.type)
    {
        case("login"):
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <Login/>
                    <div className="text-center">
                        <a >Create an account</a>
                    </div>
                    <div onClick={()=>{props.setType("reset");
                    props.setShowLoginPopUp(!props.showLoginPopUp)
                    
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
               <Register/>
              </div>
            </div>
            )
        case("reset"):
        return(
            <div className="popup">
                <div className="popup_inner">
                <ResetPassword/>
                </div>
            </div>
        )
    }

}
export default PopUp;