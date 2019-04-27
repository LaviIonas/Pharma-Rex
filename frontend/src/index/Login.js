import React, {Component} from 'react';

import LoginForm from './LoginForm.js';
import PreSideBar from './preLoginSidebar';

class Login extends Component {

  state = {
    loggedIn: true
  }

  render () {
    return (
      <div>
        <PreSideBar />
        <div>
          <div >
            <Link to="/">Home</Link>
            <h2 className="home-page">Login To Your Profile</h2>

            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
