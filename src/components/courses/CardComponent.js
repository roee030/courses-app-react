import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow } from 'mdbreact';

const Card = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "15rem" , height: "23rem" , marginTop: "20px", border: "5px solid #bbb" }}>
        <MDBCardImage className="img-fluid" src={props.img} waves />
        <MDBCardBody>
          <MDBCardTitle>{props.title}</MDBCardTitle>
          <MDBCardText>
            {props.description}
          </MDBCardText>
          <MDBBtn href="#">Click Me</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Card;