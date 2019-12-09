import React, { Component } from "react";
import { Link,BrowserRouter as Router } from "react-router-dom";
import Home from '../pages/Home'
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
class NavbarPage extends Component {
state = {
  isOpen: false,
  isConnect: null
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
handleClick() {
  ;
}

render() {
  return (
      <MDBNavbar className="Navbar"  dark expand="md" style={{backgroundImage: "linear-gradient(" + "to left, #D53D96  , #7A2A90"+" )"}}>
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem >
              <MDBNavLink to="/">
              Home
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem >
              <MDBNavLink to="/courses">
              Courses
              </MDBNavLink>
            </MDBNavItem>
            
            
            <MDBNavItem>
            <MDBFormInline waves>
              <div className="md-form my-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              </div>
            </MDBFormInline>
          </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          <MDBNavItem>
          <MDBNavLink to="#!">My Courses</MDBNavLink>
        </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Personal Info</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;