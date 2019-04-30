import './Index.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'

class NewDrugPopupForm extends Component {

  constructor () {
    super();
    this.state = {
      name: "",
      dose: "",
      total: "",
      interval: "",
      time: ""
    }
  }

  //Handle Event changes in each textarea and change state to its value
  handleName = (event) => {
    this.setState({name: event.target.value});
  }
  handleDose = (event) => {
    this.setState({dose: event.target.value});
  }
  handleTotal = (event) => {
    this.setState({total: event.target.value});
  }
  handleInterval = (event) => {
    this.setState({interval: event.target.value});
  }
  handleTime = (event) => {
    this.setState({time: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //New object of the new drug
    const newDrugData = {
      name: this.state.name,
      dose: this.state.dose,
      total: this.state.total,
      interval: this.state.interval,
      time: this.state.time
    }

    //Sends data to PillManagement to handle
    this.props.useData(newDrugData);

    //Sends Data to the profileRoute under post("/data/new-drug")
    axios
    .post("/profile/data/new-drug", newDrugData)
    .then((res) => {
      console.log(res);
    })

    //Close Popup on submittion of form
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
                Total Pills :
                <input type="text"
                       placeholder= "total"
                       value={this.state.total}
                       onChange={this.handleTotal} />
              </label>
              <label>
                Interval :
                <input type="text"
                       placeholder= "interval"
                       value={this.state.interval}
                       onChange={this.handleInterval} />
              </label>
              <label>
                Time :
                <input type="text"
                       placeholder= "time"
                       value={this.state.time}
                       onChange={this.handleTime} />
              </label>
              <input type="submit" value="Submit" />
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default NewDrugPopupForm;