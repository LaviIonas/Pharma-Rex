import React, {Component} from 'react';
import './Index.css';

import PatientRegisterForm from './PatientRegisterForm';
import CaregiverRegisterForm from './CaregiverRegisterForm';
import RegisterForm from './RegisterForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class RegisterPopup extends Component {
  constructor () {
    super();
    this.state = {
      patient: false,
      caregiver: false,
      show: true,
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

  render () {
    return (
<<<<<<< HEAD
      <div className='popup'>
        <div className='popup_inner'>
          <div >
            <h2 className="home-page">Register A New Profile</h2>
            <button onClick={this.props.closePopup}>X</button>

            {this.state.show?
              <div>
                <button onClick={this.triggerPatient}>Patient </button>
                <button onClick={this.triggerCaregiver}>Caregiver </button>
              </div>
              : null
            }

            {this.state.patient ?
              <PatientRegisterForm whenSubmit={this.props.redirectPatient}/>
              : null
            }
            {this.state.caregiver ?
              <CaregiverRegisterForm whenSubmit={this.props.redirectCaregiver}/>
              : null
            }
          </div>
        </div>
      </div>
=======
      <Modal show={this.props.show} onHide={this.props.closePopup}>
          <Modal.Header closeButton>
          <Modal.Title>Register for Pharma Rex</Modal.Title>
           </Modal.Header>
        <Modal.Body><RegisterForm /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closePopup}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.closePopup}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
>>>>>>> Design
    );
  }
}

export default RegisterPopup;
