import React, {Component} from 'react';
import './Index.css';
import DrugPopup from "./NewDrugPopupForm";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'


class PillManagment extends Component {
  constructor () {
    super();
    this.state = {
      popup: false,
      drugArray: []
    }
  }
  //Toggle the popup based on a boolean 'popup'
  togglePopup = () => {
    this.setState({
      popup: !this.state.popup
    });
  }

  //Push the data from the form into an array of other drug objects
  useData = (data) => {
    //Adds Drug 'data' to the array once form submitted
    this.setState({
      drugArray: [...this.state.drugArray, data]
    })
  }

  componentDidMount () {
    //Upon mounting fill the drug array with all previously existing drugs
    axios.
    get("/profile/data/fill-array")
    .then(res => {
      //For each object in the array push to array
      res.data.array.forEach((drug) => {
        this.setState({
        //Seed the array
        drugArray: [...this.state.drugArray, drug]
        })
      })

    })
  }

  render () {
    return (
      <div>
        <button onClick={this.togglePopup}>ADD NEW DRUG</button>
        {this.state.popup ?
          <DrugPopup closePopup={this.togglePopup} useData = {this.useData}/>
          : null
        }
        {
          this.state.drugArray.map(drug => {
            return <Pills name={drug.name}
                          dose={drug.dose}
                          total={drug.total}
                          interval={drug.interval}
                          time={drug.time}/>
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
        <p>{this.props.total}</p>
        <p>{this.props.interval}</p>
        <p>{this.props.time}</p>

        //-----------

      </div>
      );
  }
}

export default PillManagment;