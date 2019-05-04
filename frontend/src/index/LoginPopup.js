import React, {Component} from 'react';
import './Index.css';
import LoginForm from './LoginForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

class LoginPopup extends Component {
  constructor () {
    super();
    this.state = {
      show: true,
      loggedIn: false,
      loginError: false,
      email: "",
      password: ""
    }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password
    }

     axios
    .post("/login", loginData, {withCredentials: true})
    .then((res) => {
      console.log(res);
      this.setState({
        loggedIn: res.data.login,
        loginError: res.data.error
      })
      if(this.state.loggedIn)  {
        this.props.redirect();
      } else if (this.state.loginError) {
        this.setState({
          email: "",
          password: ""
        })

        console.log("login: ", this.state.loggedIn);
        console.log("error: ", this.state.loginError);

      }
    });
  }

render () {
  return (
    <div>
    <Modal show={this.props.showLogin} onHide={this.props.closePopup}>
      <Modal.Header closeButton>
        <Modal.Title>Login to your account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { this.state.loginError ?
          <p style={{color: "red"}}>Email or Password is Incorrect</p>
          : null
        }

        <LoginForm
          email={this.state.email}
          password={this.state.password}
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          handleSubmit={this.handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.closePopup}>Close</Button>
        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>

    </div>
  )}
}

export default LoginPopup;
