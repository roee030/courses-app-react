import React from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

function UserInfo({ details = [] }) {
    const title = 'Personal Info';

    return (
        <MDBContainer>
            <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                <MDBCardTitle>{title}</MDBCardTitle>
                {renderList(details)}
            </MDBCard>      
        </MDBContainer>    
    )
}

function renderList(details = []) {
    return (
        details.map(item => {
            return (
                createGroupItem(item.title, item.description)
            )
        })
    )
    
}

function createGroupItem(title, des) {
    return (
        <MDBCardText key={title}>
            {`${title}:     ${des}`}
        </MDBCardText>
    )
}

export default UserInfo;

//<MDBListGroup>
//                    <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
//                    <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
//                    <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
//                </MDBListGroup>