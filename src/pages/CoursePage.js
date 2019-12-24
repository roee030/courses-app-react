import React , {useContext} from 'react'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer ,MDBTypography , MDBBtn ,  MDBListGroup, MDBListGroupItem} from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import photo from "../components/coverPhoto.png"
import UserContext from '../helpers/UserContext';
import Title from '../components/Title';
import './CoursePage.css';
export default function CoursePage() {
    const userState = "SignInAndRegisterToCourse";
    return (
        <div>
        <MDBBreadcrumb >
        <MDBBreadcrumbItem>
            <Link to="/">Home</Link>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Course Name</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <div id="courseCoverPhoto">
        <div id="CourseName">
            <MDBTypography tag='h1' variant="h1-responsive">React Native</MDBTypography>
            <MDBTypography tag='h3' variant="h3-responsive">Understand React Native with Hooks, Context, and React Navigation.</MDBTypography>
            {displayButton(userState)}
        </div>
      </div>
      {displayCourseInfo(userState)}

      </div>
    );
}
function displayButton(userState)
{
    switch(userState)
    {
        case "NonSignIn":
            return (
                <>
                </>
            );
            break;
        case "SignInAndNotRegisterToCourse":
            return (
                <MDBBtn outline color="primary">Sign in to Course</MDBBtn>
            )

            break;
        case "SignInAndRegisterToCourse":
            return (
                <MDBBtn disabled  outline color="success">Enrolled to this course </MDBBtn>
            )
            break;
        case "CourseAdmin":
            return (
                <MDBBtn outline color="danger">Edit Course</MDBBtn>

            )
            break;
        case "SuperUser":
            return (
                <MDBBtn outline color="danger">Edit Course</MDBBtn>

            )
            break;

    }
}
function displayCourseInfo (userState) 
{
    if(userState == "NonSignIn")
    {
        return (
            <h1></h1>
        )
    }
    else if(userState == "SignInAndNotRegisterToCourse")
    {
        return (
            <h1></h1>
        )
    }
    else if(userState == "SignInAndRegisterToCourse")
    {
        return (
            <div style={{ marginTop: "2px"}}>
            <h1>What We will Learn in this course</h1>
            <div style={{display: "flex"}}>
            <MDBListGroup style={{ width: "22rem",marginBottom: "5px" , marginRight: "5px" ,marginLeft: "5px"}}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
            </MDBListGroup>

            <MDBListGroup style={{ width: "22rem" }}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
            </MDBListGroup>
            </div>
            </div>
        )
    }
    else if(userState == "CourseAdmin")
    {
        return (
            <div style={{ marginTop: "2px"}}>
            <h1>What We will Learn in this course</h1>
            <div style={{display: "flex"}}>
            <MDBListGroup style={{ width: "22rem",marginBottom: "5px" , marginRight: "5px" ,marginLeft: "5px"}}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
            </MDBListGroup>

            <MDBListGroup style={{ width: "22rem" }}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
            </MDBListGroup>
            </div>
            </div>
        )
    }
    else if(userState == "SuperUser")
    {
        return (
            <div style={{ marginTop: "2px"}}>
            <h1>What We will Learn in this course</h1>
            <div style={{display: "flex"}}>
            <MDBListGroup style={{ width: "22rem",marginBottom: "5px" , marginRight: "5px" ,marginLeft: "5px"}}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
            </MDBListGroup>

            <MDBListGroup style={{ width: "22rem" }}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
            </MDBListGroup>
            </div>
            </div>
        )
    }
}
