import React, {Component} from 'react';
import './Index.css';
import RegisterForm from './RegisterForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class RegisterPopup extends Component {
  constructor () {
    super();
    this.state = {
      apples: true
    }
  }
  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.closePopup}>
          <Modal.Header closeButton>
          <Modal.Title>Register for Pharma Rex</Modal.Title>
           </Modal.Header>
        <Modal.Body><RegisterForm /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closePopup}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.closePopup}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default RegisterPopup;
