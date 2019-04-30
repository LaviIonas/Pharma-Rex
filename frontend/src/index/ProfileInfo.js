import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
import profilePic from '../logo.svg';
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
    .get("/profile/data/profileInfo")
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
        <img src={profilePic} className = "profile-pic" alt="Logo" />
        <p>Name: {this.state.name}</p>
        <p>ID for Caretaker: {this.state.careID}</p>
        <p>Doctor: {this.state.doctor}</p>
        <p>Pharmacy Number: {this.state.pharmacyNum}</p>

      </div>
    );
  }
}

export default ProfileInfo;