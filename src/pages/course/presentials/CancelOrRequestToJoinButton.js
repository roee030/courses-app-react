import React, { useState } from 'react';
import { MDBBtn } from 'mdbreact';

export default function CancelOrRequestToJoinBtn({ isPending, onCancelRequestButtonClick, onRequestButtonClick }) {
    const [requestButtonEnabled, setRequestButtonEnabled] = useState(true);

    return (
        <MDBBtn disabled={!requestButtonEnabled} onClick={onClick}>
            { isPending ? 'Cancel Request' : 'Request to join' }
        </MDBBtn>
    )

    function onClick() {
        setRequestButtonEnabled(!requestButtonEnabled);
        isPending ? onCancelRequestButtonClick() : onRequestButtonClick();
    }
}