import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class PatientRegisterForm extends Component {

  render() {
    return (
      <div>
        <form>
              <label>
                Username :
                <input type="text"
                       placeholder= "username"
                       value={this.props.username}
                       onChange={this.props.handleUsername} />
              </label>

              <label>
                Password :
                <input type="text"
                       placeholder= "password"
                       value={this.props.password}
                       onChange={this.props.handlePassword} />
              </label>

              <label>
                Phone :
                <input type="text"
                       placeholder= "phone #"
                       value={this.props.phone}
                       onChange={this.props.handlePhone} />
              </label>

              <label>
                Age :
                <input type="text"
                       placeholder= "age"
                       value={this.props.age}
                       onChange={this.props.handleAge} />
              </label>

              <label>
                Color :
                <input type="text"
                       placeholder= "color"
                       value={this.props.color}
                       onChange={this.props.handleColor} />
              </label>
            </form>
      </div>
    );
  }
}
export default PatientRegisterForm;
