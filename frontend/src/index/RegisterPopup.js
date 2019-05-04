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
      email: "",
      password: "",
      name: "",
      phone: "",
      careId: "",
      doctor: "",
      pharmacy: ""
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

  handleDoctor = (event) => {
    this.setState({doctor: event.target.value});
  }
  handlePharmacy = (event) => {
    this.setState({pharmacy: event.target.value});
  }
  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handleName = (event) => {
    this.setState({name: event.target.value});
  }


//handle patientsubmit
  handlePatientSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      status: "Patient",
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      doctor: this.state.doctor,
      pharmacy: this.state.pharmacy
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
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      careId: this.state.careId,
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
              email={this.state.email}
              password={this.state.password}
              name={this.state.name}
              phone={this.state.phone}
              doctor={this.state.doctor}
              pharmacy={this.state.pharmacy}
              handleEmail={this.handleEmail}
              handlePassword={this.handlePassword}
              handleName={this.handleName}
              handlePhone={this.handlePhone}
              handleDoctor={this.handleDoctor}
              handlePharmacy={this.handlePharmacy}
              />
              : null
            }
            {this.state.caregiver ?
              <CaregiverRegisterForm whenSubmit={this.props.redirectCaregiver}
              email={this.state.email}
              password={this.state.password}
              name={this.state.name}
              phone={this.state.phone}
              careId={this.state.careId}
              handleEmail={this.handleEmail}
              handlePassword={this.handlePassword}
              handleName={this.handleName}
              handlePhone={this.handlePhone}
              handleCareId={this.handleCareId}
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
