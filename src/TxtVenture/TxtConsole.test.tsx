import React from "react";
import ReactDOM from "react-dom";
import TxtConsole from "./TxtConsole";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtConsole />, div);
  ReactDOM.unmountComponentAtNode(div);
});
