import React, {Component} from 'react';

class CaregiverRegisterForm extends Component {

  render() {
    return (
      <div>
        <form>
              <label>
                Username :
                <input type="text"
                       placeholder= "username"
                       value={this.props.username}
                       onChange={this.props.handleUsername} />
              </label>

              <label>
                Password :
                <input type="text"
                       placeholder= "password"
                       value={this.props.password}
                       onChange={this.props.handlePassword} />
              </label>

              <label>
                Phone :
                <input type="text"
                       placeholder= "phone #"
                       value={this.props.phone}
                       onChange={this.props.handlePhone} />
              </label>

              <label>
                CareId :
                <input type="text"
                       placeholder= "CareId"
                       value={this.props.careId}
                       onChange={this.props.handleCareId} />
              </label>

              <label>
                Color :
                <input type="text"
                       placeholder= "color"
                       value={this.props.color}
                       onChange={this.props.handleColor} />
              </label>
            </form>
      </div>
    );
  }
}
export default CaregiverRegisterForm;
