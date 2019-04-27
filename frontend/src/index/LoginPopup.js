import React, {Component} from 'react';
import './Index.css';
import LoginForm from './LoginForm';

class LoginPopup extends Component {
  constructor () {
    super();
    this.state = {
      loggedIn: true
    }
  }
  render () {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div>
            <div>
              <div >
                <h2 className="home-page">Login To Your Profile</h2>
                <button onClick={this.props.closePopup}>X</button>

                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPopup;