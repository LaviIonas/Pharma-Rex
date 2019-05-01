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
      patientArray: [{name: "Amelia"}, {name: "Catherine"}, {name: "Johnathan"}]
    }
  }

  // componentDidMount() {
  //   // axios
  //   // .get("/caretaker/data/caretakerInfo")
  //   // .then((res) => {
  //   //   console.log(res);
  //   //   this.setState ({ name: res.data.name })
  //   //   res.data.array.forEach((patient) => {
  //   //     this.setState({
  //   //     //Seed the array
  //   //     patientArray: [...this.state.patientArray, patient]
  //   //     })
  //   //   })
  //   //
  //   // })
  // }
  render () {
    console.log("Running Caretaker info");
    return (
      <div className="CaretakerStyle">
        <img src={profilePic} className = "profile-pic" alt="Logo" />
        <p> Name: {this.state.name} </p>
        {
          this.state.patientArray.map(patient => {
            return <Patient name={patient.name} />
          })
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

      </div>
      );
  }
}

export default CaretakerInfo;
