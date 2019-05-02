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
      patientArray: []
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
