import React, { Component } from "react";
import WoodDataService from "../services/wood.service";

export default class CalculateCutting extends Component {
  constructor(props) {
    super(props);
    this.retrieveLength = this.retrieveLength.bind(this);
    this.saveLength = this.saveLength.bind(this);
    this.onChangeLength = this.onChangeLength.bind(this);
    this.addInput = this.addInput.bind(this);
    this.submitRequiredItem = this.submitRequiredItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      length: 0,
      editting: false,
      submitted: false,
      data: null,
      inputs: [{length: 0, num: 0}],
      cuttings: null
    };
  }

  
  toggleEdit = () => {
    this.setState(prevState => ({
      editting: !prevState.editting
    }));
  }

  // This ensures that retrieveLength is called after the initial render.
  componentDidMount() {
    this.retrieveLength();
  }

  onChangeLength(e) {
    if (!e.target) {
      return;
    } 
    this.setState({
      length: e.target.value
    });
  }

  saveLength() {
    let length = this.state.length;

    WoodDataService.updateWoodSize(length)
      .then(response => {
        this.setState({
          length: length,
          editting: false,
          submitted: true,
          data: null
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  retrieveLength() {
    WoodDataService.getWoodSize()
      .then(response => {
        this.setState({
          length: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  addInput(){
    this.setState(prevState => ({
      inputs: [...prevState.inputs, {length: 0, num: 0}],
    }));
  }

  handleInputChange(index, inputName, value){
    const newInputs = this.state.inputs.map((item, i) => {
      if (index !== i) return item;
      return {...item, [inputName]: value};
    });
    this.setState({inputs: newInputs});
  }


  //TODO
  submitRequiredItem(){  
    WoodDataService.getCuttings(this.state.inputs)
      .then(response => {
        this.setState({
          cuttings: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        <p>Standard wood length: <button onClick={this.toggleEdit}>{this.state.length !==0 && this.state.length}</button></p>
        <p>
        </p>
        {
          this.state.editting && 
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You updated the size successfully!</h4>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="title">New Length</label>
                    <input
                      type="text"
                      className="form-control"
                      id="length"
                      required
                      value={this.state.length}
                      onChange = {this.onChangeLength}
                      name="length"
                    />
                  </div>
      
                  <button onClick={this.saveLength} className="btn btn-success">
                    Submit
                  </button>
                </div> )}
            </div>
         }

        <p>Enter the length of the wood to be cut:</p>
        <div>
          {this.state.inputs.map((item, index) => (
            <div key={index}>
            Length: <input type="text" value={item.length} onChange={(e) => this.handleInputChange(index, 'length', e.target.value)}  />   
            Number: <input type="text" value={item.num} onChange={(e) => this.handleInputChange(index, 'num', e.target.value)}  />  
            </div>
          ))}
          <button onClick={this.addInput}>Add Input</button>
          <button onClick={this.submitRequiredItem}>Calculate</button>
        </div>
      </div>
    );
  }
}