import React, { Component } from 'react';

import './Index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'

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
  <div>
  <h2 className="navbar">Navbar will go here</h2>
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
    </div>
  );
};
//Sends test text using twillo
const sendText = () => {
  axios
    .get("/test")
    .then((res) => {
      console.log("sent");
    })
}

// setting up the timeralert to go to the backend
const timerAlert = (time) => {
  setTimeout( () => {
    //REMINDER
    sendText();
    //SEND TO BACKEND NEW TIMER NOTIFICATION

  }, time);
}

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

//
componentDidMount() {
  //ask backend server for the date when notification has to send
  let alertTime = Date.now() + 10000;
  let nowTime = Date.now();
  timerAlert(alertTime - nowTime)
  //add in loop for pulling out data from table
}


  render () {
    return (
      <div>
        <PreSideBar />
        <div>
          <h2 className="home-page">Pharma Rex</h2>
          <h2 className="secondary-line">The best way to track your medications. </h2>

          <ul className="pitch">
          <li className="pitch__bullet">
            <FontAwesomeIcon icon={faUserCheck} className="pitch__icon" />
              <p>Free to sign up and use - no credit card needed!</p>
            </li>
            <li className="pitch__bullet">
              <FontAwesomeIcon icon={faSearch} className="pitch__icon" />
              <p>Manage all your medications from one centralized page</p>
            </li>
            <li className="pitch__bullet">
              <FontAwesomeIcon icon={faListUl} className="pitch__icon" />
              <p>Caregivers can monitor loved ones from afar.</p>
            </li>
        </ul>



          <div className="spacer5" />
          <div className="vertical-buttonpanel">
            <Link className="buttontransparent home" to="/Login">Login</Link>
            <Link className="buttonprimary" to="/Register">Register</Link>
          </div>


          <div className="links-to-info">
            <p>
              View Pharma Rex on <a className="project_link" href="https://github.com/LaviIonas/Pharma-Rex">Github</a>.</p>
            <p>
            Made using what we learned at <a className="project__link" href="https://lighthouselabs.com/">Lighthouse Labs</a>.
            </p>
          </div>

          <button onClick={sendText}>Send Text</button>


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
        <h2 className="home-page">About Pharma Rex</h2>
          <div className="about-text">
            <p>Here is where some text goes about the actual product</p>
              <button className="animate-button">Remember to take
                <span>your pills!.</span>
              </button>
              <h2>What is Pharma Rex?</h2>
      <p>Pharma Rex is an easy to use tool that helps patients and their caregivers manage their medications. It's free to use and fun to interact with. Never miss a pill again!
      </p>

        <br />
      <h2>Why did you make Pharma Rex?</h2>
      <p>Pharma Rex started like so many other products: we wanted to solve a problem. In the United States, patients failing to take their prescribed medications cost the healthcare system
      over $300 billion last year. The problem isn't only due to the cost of medications, either. In the UK, which offers subsized or free medications, 1 in 5 patients admits to forgetting to take their medication. We wanted to fix that.</p>
            </div>
          </div>
        </div>

  );
}

function Contact () {
    return (
    <div>
      <PostSideBar />
      <div>
        <h2 className="home-page">Get in touch with us</h2>
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
