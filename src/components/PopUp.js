import React from 'react';
import './css/PopUp.css';
import Register from '../pages/Register'
import Login from '../pages/Sign-in'
function PopUp(props) {
    switch(props.type)
    {
        case("login"):
        return (
            <div className='popup'>
              <div className='popup_inner'>
               <Login/>
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
    }
 
  
}

function createButtons() {
  return <h1>Roee</h1>;
}
export default PopUp;