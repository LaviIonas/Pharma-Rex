import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

class LoginForm extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
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
            </form>
      </div>
    );
  }
}
export default LoginForm;
