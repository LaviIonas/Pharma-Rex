import React, { Component } from 'react';
import './Index.css';
import SideBar from './sidebar';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

/*

Axios Example use
Get:
  getData = () => {
    axios
    .get("/")
    .then((res) => {
      this.setState({ message: res.data.message })
    })
  }
Post:
  sendData = () => {
    const msg = {
      a: "1"
    }
    axios
    .post("/", msg)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
  }
*/


axios.defaults.baseURL = 'http://localhost:3001'

function ComponentManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>

      </div>
    </Router>
  );
};

class Home extends Component {

  state = {
    redirectLogin: false,
    redirectRegister: false
  }

  setRedirectLogin = () => {
    this.setState({
      redirectLogin: true
    })
  }

  setRedirectRegister = () => {
    this.setState({
      redirectRegister: true
    })
  }

  renderRedirectLogin = () => {
    if (this.state.redirectLogin) {
      this.setState({
        redirectLogin: true
      })
      return <Redirect to='/login' />
    }
  }
  renderRedirectRegister = () => {
    if (this.state.redirectRegister) {
      this.setState({
        redirectRegister: true
      })
      return <Redirect to='/register' />
    }
  }

  render () {
    return (
      <div>
        <SideBar />
        <div>
          <h2 className="home-page">Pharma Rex</h2>
          {this.renderRedirectLogin()}
          {this.renderRedirectRegister()}
            <button className="home-button" onClick={this.setRedirectLogin} type="button">LOGIN</button>
            <button className="home-button" onClick={this.setRedirectRegister} type="button">REGISTER</button>

        </div>
      </div>

    );
  }
};

class Login extends Component {
  state = {
    redirect: false,
    loggedIn: true
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: true
      })
      return <Redirect to='/' />
    }
  }

  handleSubmit = () => {
    console.log()
  }

  render () {
    return (
      <div>
        <SideBar loggedIn = {this.state.loggedIn}/>
        <div>
          <div >
            {this.renderRedirect()}
            <h2 className="home-page">Login To Your Profile</h2>
            <button className="home-button" onClick={this.setRedirect} type="button">HOME</button>

            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Register extends Component {

  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: true
      })
      return <Redirect to='/' />
    }
  }
  render () {
    return (
      <div>
        <SideBar />
        <div>
        {this.renderRedirect()}
          <h2 className="home-page">Register A New Profile</h2>
            <button className="home-button" onClick={this.setRedirect} type="button">HOME</button>

        </div>
      </div>

    );
  }
}

function Profile () {
    return (
    <div>
      <SideBar />
      <div>
        <h2 className="home-page">Register A New Profile</h2>
      </div>
    </div>

  );
}

export default ComponentManager;

// export default App;
