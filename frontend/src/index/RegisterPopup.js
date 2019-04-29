import React, {Component} from 'react';
import './Index.css';
import PatientRegisterForm from './PatientRegisterForm';
import CaregiverRegisterForm from './CaregiverRegisterForm';

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
    );
  }
}

export default RegisterPopup;