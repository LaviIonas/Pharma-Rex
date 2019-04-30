import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class PatientRegisterForm extends Component {

  state = {
    username: "",
    password: "",
    phone: "",
    age: "",
    color: ""
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  }
  handlePhone = (event) => {
    this.setState({phone: event.target.value});
  }
  handleAge = (event) => {
    this.setState({age: event.target.value});
  }
  handleColor = (event) => {
    this.setState({color: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      status: "Patient",
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      age: this.state.age,
      color: this.state.color
    }

    axios
    .post("/register", registerData, {withCredentials: true})
    .then((res) => {
      alert("Thank you for the info");
    })

    this.props.whenSubmit();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
              <label>
                Username :
                <input type="text"
                       placeholder= "username"
                       value={this.state.username}
                       onChange={this.handleUsername} />
              </label>

              <label>
                Password :
                <input type="text"
                       placeholder= "password"
                       value={this.state.password}
                       onChange={this.handlePassword} />
              </label>

              <label>
                Phone :
                <input type="text"
                       placeholder= "phone #"
                       value={this.state.phone}
                       onChange={this.handlePhone} />
              </label>

              <label>
                Age :
                <input type="text"
                       placeholder= "age"
                       value={this.state.age}
                       onChange={this.handleAge} />
              </label>

              <label>
                Color :
                <input type="text"
                       placeholder= "color"
                       value={this.state.color}
                       onChange={this.handleColor} />
              </label>
              <input type="submit" value="Submit" />
            </form>
      </div>
    );
  }
}
export default PatientRegisterForm;
