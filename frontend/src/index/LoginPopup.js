import React, {Component} from 'react';
import './Index.css';
import LoginForm from './LoginForm';

class LoginPopup extends Component {
  constructor () {
    super();
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

                <LoginForm whenSubmit={this.props.redirect}/>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPopup;