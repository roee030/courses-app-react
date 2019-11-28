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
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}>
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/" onClick={this.handleToggle}>Home</Link>
            </li>
            <li>
              <Link to="/courses" onClick={this.handleToggle}>Courses</Link>
            </li>
            
          </ul>
        </div>
      </nav>
    );
  }
}