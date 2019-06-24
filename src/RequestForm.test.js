import React from "react";
import ReactDOM from "react-dom";
import RequestForm from "./components/Form/RequestForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RequestForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
