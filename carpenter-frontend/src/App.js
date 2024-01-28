import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CalculateCutting from "./components/calculate-wood.component";
import ChangeWoodSize from "./components/change-wood-size.component.js";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            smartCarpenter
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/woodsize"} className="nav-link">
                Calculate
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes> 
            {/* the following content associates the url path with the component to be rendered */}
            {/* path here refers to the url path shown in the address bar */}
            <Route path="/" element={<CalculateCutting />} />  
            <Route path="/woodsize" element={<CalculateCutting />} />  
            <Route path="/change" element={<ChangeWoodSize />} />  
          </Routes>
        </div>
      </div>
    );
  }npm
}

export default App;