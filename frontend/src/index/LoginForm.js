import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  sendLoginData = () => {
    axios
    .post("/login")
    .then((res) => {
      this.setState({ message: res.data.message })
    })
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", this.state.username);
    console.log("Password:", this.state.password);

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
              <input type="submit" value="Submit" />
            </form>
      </div>
    );
  }
}
export default LoginForm;