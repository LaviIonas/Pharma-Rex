

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
      drugArray: [{name: "Tylenol", dose: "2 a day", total: "46", interval: "Every 16 hours", time: "8 am"},{name: "Ibuprofen", dose: "4 a day", total: "50", interval: "Every 8 hours", time: "1 pm"}]
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
    // //Upon mounting fill the drug array with all previously existing drugs
    // axios.
    // get("/profile/data/fill-array")
    // .then(res => {
    //   //For each object in the array push to array
    //   res.data.array.forEach((drug) => {
    //     this.setState({
    //     //Seed the array
    //     drugArray: [...this.state.drugArray, drug]
    //     })
    //   })

    // })
  }

  render () {
    return (
      <div className="drugListStyle">
        <button className="addPill" onClick={this.togglePopup}>ADD NEW DRUG</button>
        {this.state.popup ?
          <DrugPopup closePopup={this.togglePopup} useData = {this.useData}/>
          : null
        }
        {
          this.state.drugArray.map(drug => {
            return <Pills
                          name={drug.name}
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
      <div className="addPillPillManagement" >
        
        <p className="drugNamePillManagement">Drug Name: {this.props.name}</p>
        <p className="dosePillManagement">Dose: {this.props.dose}</p>
        <p className="totalPillsPillManagement">Total Pills: {this.props.total}</p>
        <p className="intervalPillManagement">Interval: {this.props.interval}</p>
        <p className="timePillManagement">Time: {this.props.time}</p>



      </div>
      );
  }
}

export default PillManagment;
