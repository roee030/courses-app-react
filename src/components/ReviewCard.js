import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow } from 'mdbreact'; // TODO: delete unnecessary

function ReviewCard(props) {
  const reviewLink = '/reviews/';
  
  return (
      <MDBCard style={{ width: "20vw" , height: "50%" , border: "2px solid #444444" }} >
        <MDBCardBody>
          <MDBCardTitle>{props.title}</MDBCardTitle>
          <MDBCardText>
            {props.description}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
  )
}

export default ReviewCard;