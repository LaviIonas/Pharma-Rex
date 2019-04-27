import React, {Component} from 'react';

let msg = '';
let name = '';

class LoginForm extends Component {
  //When Key is Pressed, if value is 'Enter' send data to APP.jsx, then reset data for the placeholders
  handleKeyPressMsg = (event) => {
      if(event.key == 'Enter'){
        event.preventDefault();
        msg = event.target.value;
        this.props.handleInputMsg(msg);
        event.target.value = '';
      }
  }
  handleKeyPressName = (event) => {
      if(event.key == 'Enter'){
        event.preventDefault();
        name = event.target.value;
        this.props.handleInputName(name);
        event.target.value = '';
      }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
              <label>
                Username :
                <input type="text"
                       placeholder= "username"
                       value={this.state.username}
                       onChange={this.handleUsername} />
              </label>
              <label>
                Password :
                <input type="text"
                       placeholder= "password"
                       value={this.state.password}
                       onChange={this.handlePassword} />
              </label>
              <input type="submit" value="Submit" />
            </form>
      </div>
    );
  }
}
export default ChatBar;