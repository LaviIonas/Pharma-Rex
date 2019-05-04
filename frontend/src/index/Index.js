import React, { Component } from 'react';

import './Index.css';
import dino from "../dino.gif";
import rainbow from "./rainbowpills.jpg"
import circle1 from "../1.png";
import circle2 from "../2.png";
import circle3 from "../3.png";
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

import CaretakerInfo from './CaretakerInfo';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Navbar from './Navbar';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';


function ComponentManager() {
  return (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/caretaker" component={Caretaker}/>
        <Route path="/caretaker_info" component={CaretakerInfo}/>
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
  console.log("Do nothing");
  // axios
  //   .get("/test----")
  //   .then((res) => {
  //     console.log("sent");
  //   })
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
      redirectLoginP: false,
      redirectLoginC: false,
      redP: false,
      redC: false
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

  redirectLoginP = () => {
    this.setState({
      redirectLoginP: true
    })
  }
  redirectLoginC = () => {
    this.setState({
      redirectLoginC: true
    })
  }

  redirectPatient = () => {
    console.log("hit hit");
    this.setState ({
      redP: true
    })
  }

  redirectCaregiver = () => {
    this.setState ({
      redC: true
    })
  }

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
        <div className="dino-background"></div>
        <img src={dino} className="dino" alt="running..." />
        <div className="dino-ground"></div>

        <Navbar />
        <div>

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
            <button className="buttontransparent home" onClick={this.toggleLogin} >Login</button>
            <button className="buttonprimary" onClick={this.toggleRegister} >Register</button>
          </div>


          <div className="links-to-info">
            <p>
              View Pharma Rex on <a className="project_link" href="https://github.com/LaviIonas/Pharma-Rex">Github</a>.</p>
            <p>
            Made using what we learned at <a className="project__link" href="https://lighthouselabs.com/">Lighthouse Labs</a>.
            </p>
          </div>

          // <button onClick={sendText}>Send Text</button>//

          <button onClick={this.toggleLogin}>Login</button>
          <button onClick={this.toggleRegister}>Register</button>


            <RegisterPopup
            showRegister={this.state.showRegister}
              closePopup={this.toggleRegister}
              redirectPatient={this.redirectPatient}
              redirectCaregiver={this.redirectCaregiver}
              />

            <LoginPopup
            showLogin={this.state.showLogin}
              closePopup={this.toggleLogin}
              redirectP={this.redirectLoginP}
              redirectC={this.redirectLoginC}

            />

          {this.state.redirectLoginP ?
            <Redirect to = {"/profile"} />
            : null
          }
          {this.state.redirectLoginC ?
            <Redirect to = {"/caretaker"} />
            : null
          }

          {this.state.redP ?
            <Redirect to = {"/profile"} />
            : null
          }

          {this.state.redC ?
            <Redirect to = {"/caretaker"} />
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

class Caretaker extends Component {
  render() {
    return (
      <div>
        <CaretakerInfo />
      </div>

    );
  }
}

function About () {
    return (
    <div>
      <PostSideBar />
      <div>
      <Navbar />
        <h2 className="home-page">About</h2>
          <div className="about-text">
          <div className="pills-about-image"></div>
          <img src={rainbow} className="rainbow" />
            <p></p>

              <h2 className="about-header">What is Pharma Rex?</h2>
      <p>Pharma Rex is an easy to use tool that helps patients and their caregivers manage their medications.
      </p>

        <br />

      <div className="facts-circles"></div>
      <img src={circle1} className="circle1" />
      <img src={circle2} className="circle2" />
      <img src={circle3} className="circle3" />
      <br />
      <p className="about-why">In starting Pharma Rex, we aim to reduce the burden that wasted medication places on the healthcare system. </p>
            </div>
          </div>
        </div>

  );
}

function Contact () {
    return (
    <div>
      <PostSideBar />
      <Navbar />
      <div>
        <h2 className="home-page">Get in touch with us</h2>
        <br></br>
        <br></br>
        <br></br>

        <p className="contact-text">Want more information? Email us: info@pharmarex.com</p>
      </div>
    </div>

  );
}

class Settings extends Component {

  constructor () {
    super();
    this.state = {
      name: ""
    }
  }


  handleName = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const settingsData = {
      name: this.state.name,
    }

    axios
    .post("/settings/data/name-change", settingsData, {withCredentials: true})
    .then((res) => {
      console.log(res);
    })
    .then((res) => {
      this.setState({
        name: ""
      })
    })

  }
  render() {
    return (
    <div>
      <PostSideBar />
      <div>
        <h2 className="home-page">Settings</h2>
        <form onSubmit={this.handleSubmit}>
              <label>
                Name :
                <input type="text"
                       placeholder= "name"
                       value={this.state.name}
                       onChange={this.handleName} />
              </label>
              <input type="submit" value="Submit" />
            </form>
      </div>
    </div>

    );
  }
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
