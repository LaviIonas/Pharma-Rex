import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';

class Slider extends Component {

  loggedIn = () => {
    if(this.props.loggedIn) {
      return (
        <a className="menu-item" href="/">
          Logout
        </a>
        );
    }
  }
  render () {
    return (
      <Menu>
        <a className="menu-item" href="/">
          Home
        </a>

        <a className="menu-item" href="/login">
          Login
        </a>
        <a className="menu-item" href="/register">
          Register
        </a>
        <a className="menu-item" href="/profile">
          Profile
        </a>
        {this.loggedIn()}
      </Menu>
    );
  }
};

export default Slider;
