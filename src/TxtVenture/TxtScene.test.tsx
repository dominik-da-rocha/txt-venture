import React from "react";
import ReactDOM from "react-dom";
import TxtScene from "./TxtScene";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtScene />, div);
  ReactDOM.unmountComponentAtNode(div);
});
