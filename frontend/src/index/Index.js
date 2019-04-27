import React, { Component } from 'react';

import './Index.css';

import SideBar from './sidebar';
import LoginForm from './LoginForm.js';


// import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

/*

Axios Example use
Get:
  getData = () => {
    axios
    .get("/")
    .then((res) => {
      this.setState({ message: res.data.message })
    })
  }
Post:
  sendData = () => {
    const msg = {
      a: "1"
    }
    axios
    .post("/", msg)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
  }
*/


// axios.defaults.baseURL = 'http://localhost:3001'

function ComponentManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>

      </div>
    </Router>
  );
};

class Home extends Component {

  render () {
    return (
      <div>
        <SideBar />
        <div>
          <h2 className="home-page">Pharma Rex</h2>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>

    );
  }
};

class Login extends Component {

  state = {
    loggedIn: true
  }

  render () {
    return (
      <div>
        <SideBar loggedIn = {this.state.loggedIn}/>
        <div>
          <div >
            <Link to="/">Home</Link>
            <h2 className="home-page">Login To Your Profile</h2>

            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

class Register extends Component {

  render () {
    return (
      <div>
        <SideBar />
        <div>
        <Link to="/">Home</Link>
        <h2 className="home-page">Register A New Profile</h2>

        </div>
      </div>

    );
  }
}

function Profile () {
    return (
    <div>
      <SideBar />
      <div>
        <h2 className="home-page">Register A New Profile</h2>
      </div>
    </div>

  );
}

export default ComponentManager;

// export default App;
