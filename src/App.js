import React, { Component } from "react";
import "./App.css";
import RequestForm from "./components/Form/RequestForm";
import NavBar from "./components/NavBar.jsx";

import { Offline, Online } from "react-detect-offline";

const polling = {
  enabled: true,
  interval: 2000,
  timeout: 1000
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Online polling={polling}>
          <NavBar />
          <RequestForm />
        </Online>
        {/* <Offline polling={polling}>
          <h1>YOU ARE OFFLINE</h1>
        </Offline> */}
      </div>
    );
  }
}

export default App;
