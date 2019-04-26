import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:3001'



function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/get">Get Info Button</Link>
          </li>
          <li>
            <Link to="/send">Send Info Button</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/get" component={Get} />
        <Route path="/send" component={Send} />
      </div>
    </Router>
  );
};

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
};

class Get extends Component {
  constructor () {
    super();
    this.state = {
      message: "Nothing here",
    }

  }

  getData = () => {
    axios
    .get("/")
    .then((res) => {
      this.setState({ message: res.data.message })
    })
  }

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
  render() {
    return (
      <div >
        <div >
          <h2>Get Info from the Express Server</h2>
          <h2>Current Message: {this.state.message}</h2>
        </div>

        <button onClick={this.getData}>Get the info</button>
        // <button onClick={this.sendData}>Send the info</button>
      </div>
    );
  }
}


function Send() {
  return (
    <div>
      <h2>Send Data to Express</h2>
      <button>Send the info</button>
    </div>
  );
}

export default BasicExample;

// export default App;
