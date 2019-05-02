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
      this.props.whenSubmit();
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
