import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';

class Slider extends Component {

  render () {
    return (
      <Menu>
        <a className="menu-item" href="/profile">
          Profile
        </a>
        <a className="menu-item" href="/settings">
          Settings
        </a>
        <a className="menu-item" href="/contact">
          Contact
        </a>
        <a className="menu-item" href="/logout">
          Logout
        </a>
      </Menu>
    );
  }
};

export default Slider;