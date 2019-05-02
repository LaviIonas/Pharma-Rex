import React, {Component} from 'react';
import './Index.css';
import LoginForm from './LoginForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

class LoginPopup extends Component {
  constructor () {
    super();
    this.state = {
      show: true,
      loggedIn: true,
      username: "",
      password: ""
    }
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
      axios
      .get("/login/response", {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        if(res.data.loggedIn)  {
          alert ("Logged In");
        } else {
          alert ("Error occured when logging in");
        }
      })
    })

    this.props.redirect();
  }


//   render () {
//     return (
//       <div className='popup'>
//         <div className='popup_inner'>
//           <div>
//             <div>
//               <div >
//                 <h2 className="home-page">Login To Your Profile</h2>
//                 <button onClick={this.props.closePopup}>X</button>
//
//                 <LoginForm whenSubmit={this.props.redirect}/>
//
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


render () {
    return (
      <Modal show={this.props.showLogin} onHide={this.props.closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Login to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
            whenSubmit={this.props.redirect}
            username={this.state.username}
            password={this.state.password}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closePopup}>Close</Button>
          <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
)}
}

export default LoginPopup;
