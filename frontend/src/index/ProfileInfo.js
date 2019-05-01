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
      careID: ""
    }
  }

  componentDidMount() {
    axios
    .get("/profile/data/request")
    .then((res) => {
      console.log(res);
      this.setState ({
        name: res.data.name,
        careID: res.data.careID
      })
    })
  }
  render () {
    return (
      <div>
        <img src={profilePic} className = "profile-pic" alt="Logo" />
        <p>Name: {this.state.name}</p>
        <p>ID: {this.state.careID}</p>
        <p>Prescription:</p>
        <p>Physician name</p>
        <p>Pharmacy Number</p>

      </div>
    );
  }
}

export default ProfileInfo;
