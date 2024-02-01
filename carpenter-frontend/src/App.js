import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import CalculateCutting from "./components/calculate-wood.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="bg-indigo-500 border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              <Link to={"/"} className="text-white uppercase text-xl flex items-center space-x-3 rtl:space-x-reverse">
                smartCarpenter
              </Link>
              <div className="text-white flex items-center">
                <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                      <Link to={"/woodsize"} className="">
                        Calculate
                      </Link>
                    </li>
                </ul>
                
              </div>
          </div>
          
        </nav>

        <div className="container mt-3">
          <Routes> 
            {/* the following content associates the url path with the component to be rendered */}
            {/* path here refers to the url path shown in the address bar */}
            <Route path="/" element={<CalculateCutting />} />  
            <Route path="/woodsize" element={<CalculateCutting />} />
          </Routes>
        </div>
      </div>
    );
  }npm
}

export default App;