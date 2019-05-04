import React, {Component} from 'react';
import './Index.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

import PatientRegisterForm from './PatientRegisterForm';
import CaregiverRegisterForm from './CaregiverRegisterForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class RegisterPopup extends Component {
  constructor () {
    super();
    this.state = {
      patient: false,
      caregiver: false,
      show: true,
      username: "",
      password: "",
      phone: "",
      careId: "",
      color: "",
      age: "",
    }
  }

  triggerPatient = () => {
    this.setState ({
      patient: true,
      show: false
    })
  }

  triggerCaregiver = () => {
    this.setState ({
      caregiver: true,
      show: false
    })
  }
//handle Caregiver and Patient
  handleUsername = (event) => {
    this.setState({username: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  }
  handlePhone = (event) => {
    this.setState({phone: event.target.value});
  }
  handleCareId = (event) => {
    this.setState({careId: event.target.value});
  }
  handleColor = (event) => {
    this.setState({color: event.target.value});
  }

  handleAge = (event) => {
    this.setState({age: event.target.value});
  }
//handle patientsubmit
  handlePatientSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      status: "Patient",
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      age: this.state.age,
      color: this.state.color
    }

    axios
    .post("/register", registerData, {withCredentials: true})
    .then((res) => {
      alert("Thank you for the info");
    })

    this.props.redirectPatient();
  }

  //handlecaregiversubmit

  handleCaregiverSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      status: "Caregiver",
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      careId: this.state.careId,
      color: this.state.color
    }

    axios
    .post("/register", registerData, {withCredentials: true})
    .then((res) => {
      console.log(res);
      alert("Thank you for the info");
    })

    this.props.redirectCaregiver();
  }
  //new modal form:

  render () {
      return (
        <Modal show={this.props.showRegister} onHide={this.props.closePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Register a new profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.show?
              <div>
                <button onClick={this.triggerPatient}>Patient </button>
                <button onClick={this.triggerCaregiver}>Caregiver </button>
              </div>
              : null
            }

            {this.state.patient ?
              <PatientRegisterForm whenSubmit={this.props.redirectPatient}
              username={this.state.username}
              password={this.state.password}
              phone={this.state.phone}
              age={this.state.age}
              color={this.state.color}
              handleUsername={this.handleUsername}
              handlePassword={this.handlePassword}
              handlePhone={this.handlePhone}
              handleAge={this.handleAge}
              handleColor={this.handleColor}
              />
              : null
            }
            {this.state.caregiver ?
              <CaregiverRegisterForm whenSubmit={this.props.redirectCaregiver}
              username={this.state.username}
              password={this.state.password}
              phone={this.state.phone}
              careId={this.state.careId}
              color={this.state.color}
              handleUsername={this.handleUsername}
              handlePassword={this.handlePassword}
              handlePhone={this.handlePhone}
              handleCareId={this.handleCareId}
              handleColor={this.handleColor}
              />
              : null
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closePopup}>Close</Button>
            {this.state.patient ?
              <Button variant="primary" onClick={this.handlePatientSubmit}>Submit</Button>
              : null
            }
            {this.state.caregiver ?
              <Button variant="primary" onClick={this.handleCaregiverSubmit}>Submit</Button>
              : null
            }

          </Modal.Footer>
        </Modal>
  )}
  }

export default RegisterPopup;
