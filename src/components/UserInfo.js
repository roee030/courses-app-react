import React from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

function UserInfo(props) {
    const title = 'Personal Info';
    const details = props.details;

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
        <MDBCardText>
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