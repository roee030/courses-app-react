import React from 'react';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow } from 'mdbreact'; // TODO: delete unnecessary

function CourseCard({name, description, courseId}) {
    const style = {
        width: '30vw',
        transitionDuration: '0.3s',
        height: '45vw'
    };
    return (
        <Card className={'courseCard'} >
            <Link to={`/courses/${courseId}`}>
                <CardActionArea style={style}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
  )
}

export default CourseCard;
    // <MDBCard style={{ width: "20vw" , height: "50%" , border: "2px solid #444444" }} >
    //     <MDBCardBody>
    //         <MDBCardTitle>{props.name}</MDBCardTitle>
    //         <MDBCardText>
    //             {props.description}
    //         </MDBCardText>
    //     </MDBCardBody>
    // </MDBCard>