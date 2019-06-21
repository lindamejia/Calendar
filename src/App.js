import React from "react";
import "./App.css";
import RequestForm from "./components/Form/RequestForm";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <RequestForm />
    </div>
  );
}

export default App;
