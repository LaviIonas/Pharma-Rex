import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
import profilePic from '../ron-swan.png';
axios.defaults.baseURL = 'http://localhost:3001'


class CaretakerInfo extends Component {
  constructor () {
    super();
    this.state = {
      name: "",
      patientArray: []
    }
  }

  componentDidMount() {
    axios
    .get("/caretaker/data/caretakerInfo")
    .then((res) => {
      console.log(res);
      this.setState ({ name: res.data.name })
      res.data.array.forEach((patient) => {
        this.setState({
        //Seed the array
        patientArray: [...this.state.patientArray, patient]
        })
      })

    })
  }
  render () {
    return (
      <div>
        <img src={profilePic} className = "profile-pic" alt="Logo" />
        <p>Name: {this.state.name}</p>
        {
        this.state.PatientArray.map(patient => {
          return
            <Patients name={patient.name} />
          })
        }
      </div>
    );
  }
}

class Patients extends Component {
  render() {
    return (
      <div >
        //-----------//

        <p>{this.props.name}</p>

      </div>
      );
  }
}

export default CaretakerInfo;