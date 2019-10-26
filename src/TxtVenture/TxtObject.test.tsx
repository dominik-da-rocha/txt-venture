import React from "react";
import ReactDOM from "react-dom";
import TxtObject from "./TxtObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
