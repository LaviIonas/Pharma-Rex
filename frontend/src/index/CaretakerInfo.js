import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
import caregiverphoto from "../CaregiverProfilePhoto.png";
import PatientManagement from './PatientManagement';
axios.defaults.baseURL = 'http://localhost:3001'


class CaretakerInfo extends Component {
  constructor () {
    super();
    this.state = {
      name: "",
      patientArray: [],
      popup: false
    }
  }
  togglePopup = () => {
    this.setState({
      popup: !this.state.popup
    });
  }

  updateArray = (newArray) => {
    this.setState({
      patientArray: newArray
    })
  }

  componentDidMount() {
    axios
    .get("/caretaker/data/caretakerInfo", {withCredentials: true})
    .then((res) => {
      this.setState ({ name: res.data.careName })
      let self = this;
      res.data.array.forEach((patient) => {
        self.setState({
        //Seed the array
        patientArray: [...this.state.patientArray, patient]
        })
      })
    })
  }

  render () {
    return (
      <div>
      <div className="wrapperCaretaker">
        <div className="caretakerStyle">
          <img src={caregiverphoto} className = "caregiver-profile-pic" alt="Caregiver" />
        </div>
        <div className="caretakerText">
          <p> Name: {this.state.name} </p>
        </div>
      </div>
        <div>
          <button className="addPatient" onClick={this.togglePopup}>ADD NEW PATIENT</button>
          {this.state.popup ?
            <PatientManagement array={this.state.patientArray}
                               whenSubmit = {this.updateArray}
                               closePopup = {this.togglePopup} />
            : null
          }
          {this.state.patientArray.map(patient => <Patient name={patient.name}
                                                          drug={patient.drug}
                                                          dose={patient.dose}
                                                          pillsR={patient.pillsRemaining}
                                                          time={patient.time}
                                                          doctor={patient.doctorName}
                                                          pharmacyN={patient.pharmacyNumber}
                                                          rx={patient.rxNumber}
                                                          />)
                                                          }
        </div>
      </div>
    )
  }
}

class Patient extends Component {
  render() {
    return (
      <div className="Caregiverpatientliststyle" >

        <p>Patient Name: {this.props.name}</p>
        <p>Medication: {this.props.drug}</p>
        <p>Dose: {this.props.dose}</p>
        <p>Pills Remaining: {this.props.pillsR}</p>
        <p>Time: {this.props.time}</p>
        <p>Doctor: {this.props.doctor}</p>
        <p>Pharmacy Number: {this.props.pharmacyN}</p>
        <p>RX Number: {this.props.rx}</p>

      </div>
      );
  }
}

export default CaretakerInfo;
