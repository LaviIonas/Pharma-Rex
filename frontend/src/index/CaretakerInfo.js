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
    return (
      <div>
        <img src={profilePic} className = "profile-pic" alt="Logo" />
        <p>Name: {this.state.name}</p>
        {
        this.state.patientArray.map(patient => <Patients name={patient.name} />)
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