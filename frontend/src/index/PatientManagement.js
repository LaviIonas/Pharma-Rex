import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class PillManagment extends Component {
  constructor () {
    super();
    this.state = {
      careID: "",
      newArray: []
    }
  }

  handleID = (event) => {
    this.setState({careID: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //update
    const newCareID = {
      careID: this.state.careID
    }

    //Sends Data to the profileRoute under post("/data/new-drug")
    axios
    .post("/caretaker/data/new-patient", newCareID, {withCredentials: true})
    .then((res) => {
      res.data.array.forEach((patient) => {
        self.setState({
        //Seed the array
        newArray: [...this.state.newArray, patient]
        })
      })
      this.props.whenSubmit(this.state.newArray);
    })

    //Close Popup on submittion of form
    this.props.closePopup();
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div >
            <h2 className="home-page">Add a new Patient</h2>
            <button onClick={this.props.closePopup}>X</button>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name :
                <input type="text"
                       placeholder= "careID"
                       value={this.state.careID}
                       onChange={this.handleID} />
              </label>
              <input type="submit" value="Submit" />
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default PillManagment;
