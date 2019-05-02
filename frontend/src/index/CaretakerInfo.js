import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
import profilePic from '../ron-swan.png';
axios.defaults.baseURL = 'http://localhost:3001'


class CaretakerInfo extends Component {
  constructor () {
    super();
    this.state = {
      name: "Caregiver",
      patientArray: [{name: "Jaclyn",
      drug: "Xanax",
      dose: "2 a day",
      pillsRemaining: "20",
      time: "May 2nd, 2019",
      doctorName: "Dr. Nick",
      pharmacyNumber: "416-777-7777",
      rxNumber: "RX12345"
     }]
    }
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
      <div className="CaretakerStyle">
        <img src={profilePic} className = "profile-pic" alt="Logo" />
        <p> Name: {this.state.name} </p>
        {
          this.state.patientArray.map(patient => <Patient name={patient.name}
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
    );
  }
}

class Patient extends Component {
  render() {
    console.log(this.props.name);
    return (
      <div className="Caregiverpatientliststyle" >
        //-----------//

        <p>Patient Name: {this.props.name}</p>
        <p>Patient Medication: {this.props.drug}</p>
        <p>Dose: {this.props.dose}</p>
        <p>Pills Remaining: {this.props.pillsR}</p>
        <p>Time to take medication: {this.props.time}</p>
        <p>Patient's Doctor: {this.props.doctor}</p>
        <p>Patient's Pharmacy Phone Number: {this.props.pharmacyN}</p>
        <p>Patient's RX Number: {this.props.rx}</p>

      </div>
    );
  }
}

export default CaretakerInfo;
