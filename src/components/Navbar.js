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
      <nav className="navbar">
    <label className="navbar-toggle" id="js-navbar-toggle" for="chkToggle">
      <i className="fa fa-bars"></i>
        </label>
    <Link to="/" className="logo">logo</Link>
    <input type="checkbox" id="chkToggle"></input>
    <ul className="main-nav" id="js-menu">
      <li>
      <Link to="/" className="nav-links" onClick={this.handleToggle}>Home</Link>
      </li>
      <li>
      <Link to="/courses" className="nav-links">My Courses</Link>
      </li>
      <li>
      <Link to="/user" className="nav-links">Personal page</Link>
      </li>
  
    </ul>
  </nav>
    );
  }
}