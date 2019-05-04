import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class PatientRegisterForm extends Component {

  render() {
    return (
      <div>
        <form>
          <label>
                Email :
            <input type="text"
              placeholder= "email"
              value={this.props.email}
              onChange={this.props.handleEmail} />
          </label>

          <label>
                Password :
            <input type="text"
              placeholder= "password"
              value={this.props.password}
              onChange={this.props.handlePassword} />
          </label>

          <label>
                Name :
            <input type="text"
              placeholder= "name"
              value={this.props.name}
              onChange={this.props.handleName} />
          </label>
          <label>
                Phone :
            <input type="text"
              placeholder= "phone #"
              value={this.props.phone}
              onChange={this.props.handlePhone} />
          </label>

          <label>
                Doctor :
            <input type="text"
              placeholder= "doctor"
              value={this.props.doctor}
              onChange={this.props.handleDoctor} />
          </label>

          <label>
               Pharmacy :
            <input type="text"
              placeholder= "pharmacy"
              value={this.props.pharmacy}
              onChange={this.props.handlePharmacy} />
          </label>
        </form>
      </div>
    );
  }
}
export default PatientRegisterForm;
