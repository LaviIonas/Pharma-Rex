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
      console.log("NAME OR ARRAY? -------->", res);
      this.setState ({ name: res.data.name })
      let self = this;
      res.data.array.forEach((patient) => {
        self.setState({
        //Seed the array
        patientArray: [...this.state.patientArray, patient]
        })
      })
      console.log(this.state.patientArray);

    })
  }

  render () {
    console.log("Running Caretaker info");
    return (
      <div className="wrapperCaretaker">
        <div className="caretakerStyle">
          <img src={caregiverphoto} className = "caregiver-profile-pic" alt="Caregiver" />
        </div>
        <div className="caretakerText">
          <p> Name: {this.state.name} </p>
          <p> Name: {this.state.name} </p>
          <p> Name: {this.state.name} </p>
          <p> Name: {this.state.name} </p>
        </div>
        <div>
          <button className="addPill" onClick={this.togglePopup}>ADD NEW PATIENT</button>
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
                                                          };
        </div>
      </div>
    )
  }
}

class Patient extends Component {
  render() {
    console.log(this.props.name);
    return (
      <div className="Caregiverpatientliststyle" >
        //-----------//

        <p>{this.props.name}</p>
        <p>{this.props.drug}</p>
        <p>{this.props.dose}</p>
        <p>{this.props.pillsR}</p>
        <p>{this.props.time}</p>
        <p>{this.props.doctor}</p>
        <p>{this.props.pharmacyN}</p>
        <p>{this.props.rx}</p>

      </div>
      );
  }
}

export default CaretakerInfo;
