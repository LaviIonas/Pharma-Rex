import React, { Component } from 'react';

import './Index.css';

//Version of the sidebar shown before  logging in
import PreSideBar from './preLoginSidebar';
//Version of the sidebar shown after loggin in
import PostSideBar from './postLoginSidebar';

import RegisterPopup from './RegisterPopup';
import LoginPopup from './LoginPopup';

import PillManagement from './PillManagement';
import ProfileInfo from './ProfileInfo';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';


function ComponentManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
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

  constructor () {
    super();
    this.state = {
      showLogin: false,
      showRegister: false,
    }
  }

  toggleLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }
  toggleRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister
    });
  }

  //Sends test text using twillo
  sendText = () => {
    axios
      .get("/test")
      .then((res) => {
        console.log("sent");
      })
  }

  render () {
    return (
      <div>
        <PreSideBar />
        <div>
          <h2 className="home-page">Pharma Rex</h2>

          <button onClick={this.sendText}>Send Text</button>


          <button onClick={this.toggleLogin}>Login</button>
          <button onClick={this.toggleRegister}>Register</button>

          {this.state.showRegister ?
            <RegisterPopup closePopup={this.toggleRegister} />
            : null
          }
          {this.state.showLogin ?
            <LoginPopup closePopup={this.toggleLogin} />
            : null
          }


      </div>

      </div>

    );
  }
};

class Profile extends Component {

  render() {
    return (
      <div>
        <PostSideBar />

        <div>
          <ProfileInfo />
          <PillManagement />
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
        <h2 className="home-page">Settings</h2>
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
