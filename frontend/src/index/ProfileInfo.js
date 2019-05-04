import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
import patientphoto from "../PatientProfilePhoto.png";
axios.defaults.baseURL = 'http://localhost:3001'



class ProfileInfo extends Component {
  constructor () {
    super();
    this.state = {
      name: "",
      careID: "",
      doctor: "",
      pharmacyNum: ""
    }
  }

  componentDidMount() {
    axios
    .get("/profile/data/profileInfo", {withCredentials: true})
    .then((res) => {
      console.log(res);
      this.setState ({
        name: res.data.name,
        careID: res.data.careID,
        doctor: res.data.doctor,
        pharmacyNum: res.data.pharmacyNum
      })
    })
  }
  render () {
    return (
      <div>
        <div className="wrapper">
          <div className="profileStyle">
            <img src={patientphoto} className = "patient-profile-pic" alt="Patient" />
          </div>
          <div className="profileText">
            <p>Name: {this.state.name}</p>
            <p>ID for Caretaker: {this.state.careID}</p>
            <p>Doctor: {this.state.doctor}</p>
            <p>Pharmacy Number: {this.state.pharmacyNum}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
