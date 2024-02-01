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
      cuttings: []
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


  submitRequiredItem(){  
    WoodDataService.getCuttings(this.state.inputs)
      .then(response => {
        let data=[];
        for(let i=0; i<response.data.length; i++){
          let arr=response.data[i];//one wood
          let oneWood=[];
          let len=0;
          let num;
          for(let j=0; j<arr.length-1; j++){
            if(len===0){
              len=arr[j];
              num=1;
            }else if(len===arr[j]){
              num++;
            }else if(len!==arr[j]){
              oneWood.push({length: len, num: num});
              len=arr[j];
              num=1;
            }
          }
          oneWood.push({length: len, num: num});
          oneWood.push({length: arr[arr.length-1], num: 0});
          data.push(oneWood);
        }
        this.setState({
          cuttings: data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div class="shadow mt-10 sm:mt-0 px-4 py-5 bg-white sm:p-6">
            <div className="overflow-hidden sm:rounded-md px-4 py-5 bg-white sm:p-0">
                <span>Standard wood length: </span>
                <button onClick={this.toggleEdit} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    {this.state.length !==0 && this.state.length}
                </button>
            </div>

            {
              this.state.editting && 
              <div className="shadow mt-10 sm:mt-0 px-4 py-5 bg-white sm:p-6">
                {this.state.submitted ? (
                    <div></div>
                  ) : (
                    <div>
                      <div className="">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            New Length
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          value={this.state.length}
                          onChange = {this.onChangeLength}
                          name="length"
                        />
                      </div>
                      
                      <div className="flex flex-col items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          <button onClick={this.saveLength} className="block mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                              Submit
                          </button>
                      </div>
                      
                    </div> )}
              </div>
            }

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Enter the length and pieces of wood required:
                </label>
                <div>
                  {this.state.inputs.map((item, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3" key={index}>
                                  <label class="block text-sm font-medium text-gray-700">Length</label>
                                  <input type="text" value={item.length} onChange={(e) => this.handleInputChange(index, 'length', e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> 
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label class="block text-sm font-medium text-gray-700">Number</label>
                                <input type="text" value={item.num} onChange={(e) => this.handleInputChange(index, 'num', e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> 
                            </div>
                        </div>
                        <div className="flex flex-col items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {index===this.state.inputs.length-1 ? (<button className="block mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={this.addInput}>+</button>): (<p></p>)}
                        </div>
                      </div>
                  ))}
                  <div className="flex flex-col items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <button onClick={this.submitRequiredItem} className="block mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          Calculate
                      </button>
                  </div>
                </div>
            </div>

            <div className="block mb-2 text-sm font-medium  dark:text-white">
                  {
                      this.state.cuttings && this.state.cuttings.map((item, index) => 
                      (
                        (<div key={index} className="">
                            {this.state.cuttings ? (<p>Wood {index+1}:</p>): (<p></p>)}
                            {item.map((cutting, ind) => (
                              <span key = {ind} className="">
                                {ind === item.length - 1 ? `wasted: ${cutting.length}` : `${cutting.length} x ${cutting.num}; `}
                              </span>
                            ))}
                        </div>)
                  ))}
            </div>
      </div>

    );
  }
}