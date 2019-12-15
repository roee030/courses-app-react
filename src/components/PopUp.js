import React from 'react';
import './css/PopUp.css';

function PopUp(props) {
    return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{props.text}</h1>
            {createButtons()}
          </div>
        </div>
    )
}

function createButtons() {
    return;
}

export default PopUp;