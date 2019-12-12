import React from 'react'
import { MDBContainer, MDBAlert } from 'mdbreact';

export default function Alert(props) {
    return (
        <MDBAlert color={props.color} dismiss>
        {props.msg}
        </MDBAlert>
        
    )
}
