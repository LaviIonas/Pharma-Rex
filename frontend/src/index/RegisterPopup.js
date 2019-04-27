import React, {Component} from 'react';
import './Index.css';
import RegisterForm from './RegisterForm';

class RegisterPopup extends Component {
  constructor () {
    super();
    this.state = {
      apples: true
    }
  }
  render () {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div >
            <h2 className="home-page">Register A New Profile</h2>
            <button onClick={this.props.closePopup}>X</button>

            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPopup;