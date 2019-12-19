import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow } from 'mdbreact'; // TODO: delete unnecessary

function CourseCard(props) {
  const coursesLink = '/courses/';
  
  return (
    <MDBCard style={{ width: "20vw" , height: "50%" , border: "2px solid #444444" }} >
        <MDBCardBody>
            <MDBCardTitle>{props.name}</MDBCardTitle>
            <MDBCardText>
                {props.description}
            </MDBCardText>
        </MDBCardBody>
    </MDBCard>
  )
}

export default CourseCard;