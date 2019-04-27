import React, { Component } from 'react';

import './Index.css';

import PreSideBar from './preLoginSidebar';
import PostSideBar from './postLoginSidebar';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';



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

function ComponentManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>

        <Route path="/settings" component={Settings}/>
        <Route path="/logout" component={Logout}/>
      </div>
    </Router>
  );
};

class Home extends Component {

  render () {
    return (
      <div>
        <PreSideBar />
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
        <PreSideBar />
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
        <PreSideBar />
        <div>
        <Link to="/">Home</Link>
        <h2 className="home-page">Register A New Profile</h2>

        <RegisterForm />
        </div>
      </div>

    );
  }
}

class Profile extends Component () {



  render() {
    return (
      <div>
        <PostSideBar />
        <div>
          <h2 className="home-page">Register A New Profile</h2>
        </div>
      </div>

    );
  }
}

function About () {
    return (
    <div>
      <PostSideBar />
      <div>
        <h2 className="home-page">Register A New Profile</h2>
      </div>
    </div>

  );
}

function Contact () {
    return (
    <div>
      <PostSideBar />
      <div>
        <h2 className="home-page">Register A New Profile</h2>
      </div>
    </div>

  );
}

function Settings () {
    return (
    <div>
      <PostSideBar />
      <div>
        <h2 className="home-page">Register A New Profile</h2>
      </div>
    </div>

  );
}

function Logout () {
    return (
    <div>
      <PostSideBar />
      <div>
        <h2 className="home-page">Register A New Profile</h2>
      </div>
    </div>

  );
}

export default ComponentManager;

// export default App;
