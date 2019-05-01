import React, {Component} from 'react';
import './Index.css';
import LoginForm from './LoginForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LoginPopup extends Component {
  constructor () {
    super();
    this.state = {
      show: true,
      loggedIn: true,
    }
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
      <Modal.Body><LoginForm whenSubmit={this.props.redirect}/></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.closePopup}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.closePopup}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
)}
}

export default LoginPopup;
