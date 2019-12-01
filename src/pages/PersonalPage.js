import React, { Component } from 'react'
import './PersonalPage.css'
export default class LoginBox extends Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password:'',
          users: ''
        };
    }
    submitLogin(e) {
      e.preventDefault();
      console.log(this.state);
    }
    onChangeUserName(event) {
      this.setState({
        username:event.target.value
      });
  }
  onChangePassword(event) {
    this.setState({
      password:event.target.value
    });
}
  render() {
 
    
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onChangeUserName.bind(this)}
              />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onChangePassword.bind(this)}
              />
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
    );
    }
}