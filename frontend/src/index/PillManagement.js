import React, {Component} from 'react';
import './Index.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

class PillManagment extends Component {
  constructor () {
    super();
    this.state = {
      popup: false,
      name: "",
      dose: "",
      interval: "",
      drugArray: [{name: "Bob", dose: "Ten million", interval: "30 sec"}, {name: "Bob", dose: "Ten million", interval: "30 sec"}]
    }
  }

  togglePopup = () => {
    this.setState({
      popup: !this.state.popup
    });
  }

  useData = (data) => {

    this.setState({
      drugArray: [...this.state.drugArray, data]
    })
    console.log(this.state.drugArray);
  }

  render () {
    return (
      <div>
        <button onClick={this.togglePopup}>+</button>
        {this.state.popup ?
          <Popup closePopup={this.togglePopup} useData = {this.useData}/>
          : null
        }
        {
          this.state.drugArray.map(drug => {
            return <Pills name={drug.name} dose={drug.dose} interval={drug.interval}/>
          })
        }

      </div>
    );
  }
}

class Pills extends Component {
  render() {
    return (
      <div >
        //-----------
        <p>{this.props.name}</p>
        <p>{this.props.dose}</p>
        <p>{this.props.interval}</p>
        //-----------

      </div>
      );
  }
}

//-----------------------------

class Popup extends Component {

  constructor () {
    super();
    this.state = {
      name: "",
      dose: "",
      interval: ""
    }
  }

  handleName = (event) => {
    this.setState({name: event.target.value});
  }
  handleDose = (event) => {
    this.setState({dose: event.target.value});
  }
  handleInterval = (event) => {
    this.setState({interval: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newDrugData = {
      name: this.state.name,
      dose: this.state.dose,
      interval: this.state.interval
    }
    this.props.useData(newDrugData);

    // axios
    // .post("/profile/data/new-drug", newDrugData)
    // .then((res) => {
    //   console.log(res);
    //   axios
    //   .get("/profile/data/new-drug")
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setState ({
    //       name: res.data.name,
    //       dose: res.data.dose,
    //       interval: res.data.interval
    //     })
    //     this.props.useData(this.state.name, this.state.dose, this.state.interval);
    //   })
    // })

    this.props.closePopup();
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div >
            <h2 className="home-page">Add a new Drug</h2>
            <button onClick={this.props.closePopup}>X</button>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name :
                <input type="text"
                       placeholder= "Name of the Drug"
                       value={this.state.name}
                       onChange={this.handleName} />
              </label>
              <label>
                Dose :
                <input type="text"
                       placeholder= "dose"
                       value={this.state.dose}
                       onChange={this.handleDose} />
              </label>
              <label>
                Interval :
                <input type="text"
                       placeholder= "interval"
                       value={this.state.interval}
                       onChange={this.handleInterval} />
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