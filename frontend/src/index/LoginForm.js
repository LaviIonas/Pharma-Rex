import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class LoginForm extends Component {

  state = {
    username: "",
    password: "",
    loggedIn: false,
    loginError: true
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      username: this.state.username,
      password: this.state.password
    }

    axios
    .post("/login", loginData, {withCredentials: true})
    .then((res) => {
      console.log(res);
      axios
      .get("/login/response", {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedIn: res.data.loggedIn,
          loginError: res.data.loginError
        })
        if(this.state.loggedIn)  {
          this.props.whenSubmit();
        } else if (this.state.loginError) {
          this.setState({
            username: "",
            password: ""
          })
        }
      })
    })
  }

  render() {
    return (
      <div>
        {
          this.state.loginError ?
            <p style={{color: "red"}}>Username or Password is Incorrect</p>
          : null
        }
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