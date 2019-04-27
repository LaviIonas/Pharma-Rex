import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let loggedIn;

    const loginData = {
      username: this.state.username,
      password: this.state.password
    }

    axios
    .post("/login", loginData)
    .then((res) => {
      console.log(res);
      axios
      .get("/login/response")
      .then((res) => {
        console.log(res.data);
        if(res.data.loggedIn)  {
          alert ("Logged In");
        } else {
          alert ("Error occured when logging in");
        }
      })
    })
  }

  recieveLog = () => {

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