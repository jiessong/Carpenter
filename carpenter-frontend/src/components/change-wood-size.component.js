import React, { Component } from "react";
import WoodDataService from "../services/wood.service.js";
import { withRouter } from '../common/with-router';

class UpdateSize extends Component {
  constructor(props) {
    super(props);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.updateWoodSize = this.updateWoodSize.bind(this);

    this.state = {
      length: 0,
      message: ""
    };
  }

  componentDidMount() {
    this.retrieveLength();
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

  onChangeSize(e) {
    const newSize = parseInt(e.target.value, 10); // Parse the input value as an integer

    this.setState(function(prevState) {
        return {
         length: newSize
        };
    });
  }


  updateWoodSize() {
    WoodDataService.updateWoodSize(
      this.state.length
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The size was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {

    return (
      <div>
        <p>current Length: {this.state.length}</p>
          <div className="edit-form">
            <h4>Wood Size</h4>
            <form>
              <div className="form-group">
                <label htmlFor="length">Length</label>
                <input
                  type="text"
                  className="form-control"
                  id="length"
                  value={this.state.length}
                  onChange={this.onChangeSize}
                />
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateWoodSize}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        
      </div>
    );
  }
}

export default withRouter(UpdateSize);