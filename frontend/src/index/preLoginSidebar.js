import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';

class Slider extends Component {

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
        <a className="menu-item" href="/about">
          About
        </a>
        <a className="menu-item" href="/contact">
          Contact
        </a>
      </Menu>
    );
  }
};

export default Slider;