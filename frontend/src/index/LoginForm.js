import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

class LoginForm extends Component {

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
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
        </form>
      </div>
    );
  }
}
export default LoginForm;
