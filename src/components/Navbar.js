import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import './Navbar.css'
export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <nav class="navbar">
    <label class="navbar-toggle" id="js-navbar-toggle" for="chkToggle">
      <i class="fa fa-bars"></i>
        </label>
    <Link to="/" class="logo">logo</Link>
    <input type="checkbox" id="chkToggle"></input>
    <ul class="main-nav" id="js-menu">
      <li>
      <Link to="/" class="nav-links" onClick={this.handleToggle}>Home</Link>
      </li>
      <li>
      <Link to="/courses" class="nav-links">My Courses</Link>
      </li>
      <li>
      <Link to="/user" class="nav-links">Personal page</Link>
      </li>
  
    </ul>
  </nav>
    );
  }
}